import React, { useState } from "react";
import "./AddPost.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const categories = ["Event", "Feast", "Upcoming"];

const AddPost = () => {
  const [formData, setFormData] = useState({
    postTitle: "",
    content: "",
    category: "Feast",
    postImg: null,
  });

  const handleChange = (e) => {
    const { value, name, files } = e.target;

    if (name === "postImg")
      setFormData((prevData) => ({ ...prevData, postImg: files[0] }));
    else setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    console.log(payload);

    if (
      formData.postTitle &&
      formData.content &&
      formData.postImg &&
      formData.category
    ) {
      const response = await axios.post(
        "http://localhost:3000/api/v1/post/create",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }
  };

  return (
    <div className="add_post">
      <Link to={"/admin"} className="btn-back">
        Go Back
      </Link>
      <main>
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
              <button>Publish Post</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddPost;
