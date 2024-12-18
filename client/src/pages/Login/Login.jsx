import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../components/Utils/axiosInstance";
// import axios from "axios";
import Loader from "../../components/common/Loader/Loader";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Retrieving the "from" route or fallback to home ("/")
  const redirectPath = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(redirectPath, { replace: true });
    }

    setChecking(false);
  }, [navigate]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };

    try {
      if (formData.username && formData.username) {
        setIsLoading(true);
        const response = await axiosInstance.post("/user/login", payload);
        const data = response?.data;
        setMessage({
          status: "success",
          message: data?.message || "Login Successful",
        });
        localStorage.setItem("token", data.token);
        // Navigate to the originally requested route or home
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      const data = error?.response?.data;
      setMessage({
        status: "failed",
        message: data?.message || "Oops Something went wrong",
      });
      setIsLoading(false);
    }
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  {
    return checking ? (
      <Loader />
    ) : (
      <main className="login">
        <section className="form-section">
          <div className="wrap">
            <div className="left">
              <div className="inner-content">
                <div className="avtr">
                  <img src="/imgs/login.png" alt="" />
                </div>
                <h2>Mount Zion</h2>
              </div>
            </div>
            <div className="right">
              <a href="">Need help? </a>

              <form action="" onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <div className="row">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Jon Doe"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="row">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <p>
                  <Link>forgot password ?</Link>
                </p>

                <button disabled={isLoading}>Login</button>
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
          </div>

          {/* <div className="wrap">
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
              </div>
              <button>Publish Post</button>
            </form>
          </div> */}
        </section>
      </main>
    );
  }
};

export default Login;
