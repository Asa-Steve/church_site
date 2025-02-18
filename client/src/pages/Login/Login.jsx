import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../components/Utils/axiosInstance";
import Loader from "../../components/common/Loader/Loader";
import { jwtDecode } from "jwt-decode";
import Spinner from "../../components/common/Spinner/Spinner";

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
  const redirectPath = location.state?.from?.pathname;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      user?.role === "superAdmin"
        ? navigate(redirectPath || "/admin", { replace: true })
        : navigate(redirectPath || "/admin/articles", { replace: true });
    }

    setChecking(false);
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

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
        const response = await axiosInstance.post("/users/login", payload);
        const data = response?.data;
        setMessage({
          status: "success",
          message: data?.message || "Login Successful, Redirecting...",
        });
        localStorage.setItem("token", data.token);
        const user = jwtDecode(data.token);

        // Navigate to the originally requested route or home
        user?.role === "superAdmin"
          ? navigate(redirectPath || "/admin", { replace: true })
          : navigate(redirectPath || "/admin/articles", { replace: true });
      }
    } catch (error) {
      const data = error?.response?.data;
      setMessage({
        status: "failed",
        message: data?.message || "Oops Something went wrong",
      });
      setIsLoading(false);
    }
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
                  <Link to={"/forgot-password"}>forgot password ?</Link>
                </p>

                <button disabled={isLoading}>
                  <Spinner visible={isLoading} />{" "}
                  {isLoading ? "Login in..." : "Login"}
                </button>
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
        </section>
      </main>
    );
  }
};

export default Login;
