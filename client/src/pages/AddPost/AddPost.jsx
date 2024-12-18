import React, { useState } from "react";
import "./AddPost.scss";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../components/Utils/axiosInstance";
import usePageLoad from "../../components/Utils/usePageLoad";
import Loader from "../../components/common/Loader/Loader";

const categories = ["Event", "Feast", "Upcoming"];

const AddPost = () => {
  const [formData, setFormData] = useState({
    postTitle: "",
    content: "",
    category: "Feast",
    postImg: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const isPageLoaded = usePageLoad();

  const handleChange = (e) => {
    const { value, name, files } = e.target;

    if (name === "postImg")
      setFormData((prevData) => ({ ...prevData, postImg: files[0] }));
    else setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };

    if (
      formData.postTitle &&
      formData.content &&
      formData.postImg &&
      formData.category
    ) {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post("/posts/create", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const { status, message } = response.data;

        setMessage({ status, message });
        navigate("/articles");
      } catch (error) {
        const { status, message } = error?.message || "Something went wrong";
        setMessage({ status, message });
      }

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  {
    return !isPageLoaded ? (
      <Loader />
    ) : (
      <div className="add_post">
        <main className="addpost">
          <section className="form-section">
            <div className="wrap">
              <div className="form-header">
                <h2>CREATE NEW POST</h2>
              </div>

              <form action="" onSubmit={handleSubmit}>
                <div className="row">
                  <label htmlFor="title_post">Post Title</label>
                  <input
                    type="text"
                    name="postTitle"
                    id="title_post"
                    placeholder="Enter Title"
                    value={formData.postTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="row input-grp">
                  <div>
                    <label htmlFor="post_img">Post Image</label>
                    <input
                      type="file"
                      name="postImg"
                      id="post_img"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category">Category</label>
                    <select
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          category: e.target.value,
                        }))
                      }
                    >
                      {categories.map((category, idx) => (
                        <option value={category} key={idx}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="content">Post Content</label>
                  <textarea
                    type="text"
                    id="content"
                    placeholder="Write something interesting..."
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button disabled={isLoading}>Publish Post</button>
                <p
                  className={
                    !message?.status
                      ? "message hide"
                      : message?.status === "success"
                      ? "message success"
                      : "message failure"
                  }
                >
                  {message?.message}
                </p>
              </form>
            </div>
          </section>
        </main>
      </div>
    );
  }
};

export default AddPost;
