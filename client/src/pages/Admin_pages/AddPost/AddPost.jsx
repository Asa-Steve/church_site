import React, { useEffect, useState } from "react";
import "./AddPost.scss";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../components/Utils/axiosInstance";
import usePageLoad from "../../../components/Utils/usePageLoad";
import Loader from "../../../components/common/Loader/Loader";
import { jwtDecode } from "jwt-decode";
const categories = ["Event", "Feast", "Upcoming"];

const AddPost = () => {
  const [formData, setFormData] = useState({
    postTitle: "",
    content: "",
    category: "Feast",
    img: null,
  });
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const isPageLoaded = usePageLoad();

  // Checking if User is authorized to view Page
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/login"); // No token, user is not authenticated
        }
        const user = jwtDecode(token);

        if (user.role === "catechist") {
          return navigate("/admin/requests");
        }
      } catch (error) {
        return navigate("/admin/articles");
      }
    };

    verifyUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, [message]);

  const handleChange = (e) => {
    const { value, name, files } = e.target;

    if (name === "img")
      setFormData((prevData) => ({ ...prevData, img: files[0] }));
    else setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };

    if (payload.img && !allowedTypes.includes(payload.img.type)) {
      return setMessage({
        status: "failure",
        message: "Only PNG and JPEG images are allowed!",
      });
    }

    if (
      formData.postTitle &&
      formData.content &&
      formData.img &&
      formData.category
    ) {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post("/posts/create", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const { status, message } = response.data;

        setMessage({ status, message: `${message}, Redirecting...` });
        setIsLoading(false);

        navigate("/articles");
        setTimeout(() => {
          navigate("/articles");
        }, 2000);
      } catch ({ response: { data: err } }) {
        const { status = "failed", message = "Something went wrong" } = err;
        setMessage({ status, message });
        setIsLoading(false);
      }
    }
  };

  {
    return !isPageLoaded || isLoading ? (
      <div className="load">
        <Loader />
      </div>
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
                    <label htmlFor="img">Post Image</label>
                    <input
                      type="file"
                      name="img"
                      id="img"
                      onChange={handleChange}
                      accept="image/png,image/jpeg,image/jpg"
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
