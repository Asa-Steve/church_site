import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ForgotPw.scss";
import axiosInstance from "../../components/Utils/axiosInstance";
import Spinner from "../../components/common/Spinner/Spinner";

const ForgotPw = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

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

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      // Sending a recovery link to the user's email
      // This will be implemented in the backend
      const response = await axiosInstance.post(
        "/users/forgot-password",
        formData
      );

      // Display a success message
      setMessage({
        status: "success",
        message:
          response?.data?.message || "Check your email for a recovery link",
      });

      //   Reseting the form
      setFormData({ email: "" });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      const errorResponse = error?.response?.data;
      setMessage({
        status: "failure",
        message: errorResponse.message || "An error occurred, please try again",
      });
    }

    setTimeout(() => {
      console.log("timeout");
      setMessage(null);
    }, 3000);
  };

  return (
    <section className="forgotten">
      <section className="form-section">
        <div className="wrap">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="email">Enter Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="enter email"
                onChange={handleChange}
                value={formData.email || ""}
              />
            </div>
            <div className="row btn">
              <button className={loading && "active"} disabled={loading}>
                <Spinner visible={loading} />{" "}
                {loading ? "Sending Link" : "Send Recovery Link"}
              </button>
            </div>
            {message?.status && (
              <p className={`msg ${message.status}`}>{message.message}</p>
            )}
          </form>
        </div>
      </section>
    </section>
  );
};

export default ForgotPw;
