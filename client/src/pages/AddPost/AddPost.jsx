import React, { useState } from "react";
import "./AddPost.scss";
import { Link } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddPost = () => {
  const [value, setValue] = useState("");


  return (
    <div>
      <main>
        <Link to={"/admin"} className="btn-back">
          Go to Dashboard
        </Link>

        <section className="addpost form-section">
          <div className="wrap">
            <div className="form-header">
              <h2>ADD POST</h2>
            </div>

            <form action="" onSubmit={""}>
              <div className="row">
                <label htmlFor="title_post">Post Title</label>
                <input
                  type="text"
                  name="title_post"
                  id="title_post"
                  placeholder="Enter Title"
                  //   value={formData.fullName}
                  //   onChange={handleChange}
                  required
                />
              </div>
              <div className="row input-grp">
                <div>
                  <label htmlFor="ph">Phone Number</label>
                  <input
                    type="number"
                    name="phoneNo"
                    id="ph"
                    min={0}
                    placeholder="Phone Number"
                    // value={formData.phoneNo}
                    // onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    // value={formData.email}
                    // onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <label htmlFor="Donation_sum">
                  How Much Do you Wish To Donate ?
                </label>
                <span id="cur_icon">₦</span>
                <input
                  type="number"
                  id="Donation_sum"
                  placeholder="Donation Amount"
                  name="amount"
                  min={1000}
                  //   value={formData.amount}
                  //   onChange={handleChange}
                  required
                />
              </div>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
              />
              <button>Donate Now !</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddPost;
