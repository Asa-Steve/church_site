import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../components/Utils/axiosInstance";
import Loader from "../../components/common/Loader/Loader";
import { jwtDecode } from "jwt-decode";
import Spinner from "../../components/common/Spinner/Spinner";
import "./Reset.scss";

const Reset = () => {
  const [formData, setFormData] = useState({
    passwordConfirm: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const { resetToken } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  // Retrieving the "from" route
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
      setMessage(null);
    }, 2000);
  }, [message]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { password: formData.password, resetToken };

    if (formData.password !== formData.passwordConfirm) {
      setMessage({ status: "failure", message: "Passwords do not match" });
      return;
    }
    setIsLoading(true);
    try {
      const result = await axiosInstance.post("/users/reset-password", payload);
      const { data } = result;

      setMessage(data);

      setIsLoading(false);
      setFormData({ password: "", passwordConfirm: "" });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error?.response) {
        error.message = error?.response?.data?.message || "An error occurred";
      }
      setMessage({ status: "failure", message: error.message });
    }
  };

  {
    return checking ? (
      <Loader />
    ) : (
      <main className="reset">
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
                <h2>Password Reset</h2>
                <div className="row">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="row">
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="confirm password"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button disabled={isLoading}>
                  <Spinner visible={isLoading} />{" "}
                  {isLoading ? "Saving Changes" : "Save Changes"}
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

export default Reset;
