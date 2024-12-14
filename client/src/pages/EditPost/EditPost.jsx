import React, { useEffect, useState } from "react";
import "./EditPost.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../components/Utils/axiosInstance";
import usePageLoad from "../../components/Utils/usePageLoad";
import Loader from "../../components/common/Loader/Loader";

const categories = ["Event", "Feast", "Upcoming"];

const EditPost = () => {
  const [userFormData, setUserFormData] = useState({
    postTitle: "",
    content: "",
    category: "Feast",
    postImg: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const isPageLoaded = usePageLoad();
  const { articleSlug } = useParams();
  const [currentFile, setCurrentFile] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${articleSlug}`);
        setUserFormData({
          ...response?.data?.data,
          postImg: response?.data?.data?.file,
        });

        setCurrentFile(response?.data?.data?.file);
      } catch (err) {}
    };

    getPost();
  }, []);

  const handleChange = (e) => {
    const { value, name, files } = e.target;

    if (name === "postImg")
      setUserFormData((prevData) => ({ ...prevData, postImg: files[0] }));
    else setUserFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Append form data properly using FormData API
    const payload = new FormData();
    payload.append("postTitle", userFormData.postTitle);
    payload.append("content", userFormData.content);
    payload.append("category", userFormData.category);

    if (userFormData.postImg) {
      payload.append("postImg", userFormData.postImg); // Appending the file
    }

    if (
      userFormData.postTitle &&
      userFormData.content &&
      userFormData.category
    ) {
      try {
        setIsLoading(true);
        const response = await axiosInstance.put(
          `/posts/${articleSlug}`,
          payload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const { status, message } = response.data;
        setMessage({ status, message });

        navigate("/articles/");
      } catch (error) {
        const { status, message } = error?.message || "Something went wrong";
        setMessage({ status, message });
        console.log(error);
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
        <Link to={"/admin"} className="btn-back">
          Go Back
        </Link>
        <main className="addpost">
          <section className="form-section">
            <div className="wrap">
              <h2>EDIT POST</h2>

              <div className="form-header edit">
                <img src={`${currentFile}`} alt="" />
              </div>

              <form action="" onSubmit={handleSubmit}>
                <div className="row">
                  <label htmlFor="title_post">Post Title</label>
                  <input
                    type="text"
                    name="postTitle"
                    id="title_post"
                    placeholder="Enter Title"
                    value={userFormData.postTitle}
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
                    />
                  </div>
                  <div>
                    <label htmlFor="category">Category</label>
                    <select
                      name="category"
                      id="category"
                      value={userFormData.category}
                      onChange={(e) =>
                        setUserFormData((prevData) => ({
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
                    value={userFormData.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button disabled={isLoading}>Publish Edited Post</button>
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

export default EditPost;
