import "./EditUser.scss";

import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../components/Utils/axiosInstance";
import usePageLoad from "../../../components/Utils/usePageLoad";
import Loader from "../../../components/common/Loader/Loader";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const hiddenFileUploader = useRef(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { userId } = useParams();

  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();
  const navigate = useNavigate();

  // Checking if User is Admin and authorized to view Page
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/login"); // No token, user is not authenticated
        }
        const user = jwtDecode(token);
        user.role !== "superAdmin" && navigate("/admin");

        setIsAdmin(true);
      } catch (error) {
        setMessage(error.message);
        return;
      }
    };

    verifyUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        const fetchedUser = response.data.data;

        setUserData({
          username: fetchedUser.username,
          email: fetchedUser.email,
          role: fetchedUser.role,
          img: fetchedUser.img,
          newPassword: "",
          confirmPassword: "",
        });
        setLoading(false);
      } catch (err) {
        const { data } = err?.response;
        setMessage({
          status: data?.status || "failure",
          message: data?.message || "An error occurred",
        });
        setLoading(false);
      }
    };
    getUser();
  }, [isAdmin]);

  // Handling input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile-pic" && files) {
      // Checking if an image was uplaoded, noting change and generating a preview
      setPreview(URL.createObjectURL(files[0]));
      return setUserData((prevData) => ({ ...prevData, img: files[0] }));
    }
    return setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handling Page Uplaod / Logic for hidden img input
  const handleImageUplaod = () => {
    hiddenFileUploader.current.click();
  };

  // Handling Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.newPassword !== userData.confirmPassword) {
      return setMessage({
        status: "failure",
        message: "Passwords do not match",
      });
    }

    try {
      const payload = new FormData();
      payload.set("username", userData?.username);
      payload.set("role", userData?.role);
      userData?.img && payload.set("img", userData?.img);
      payload.set("email", userData?.email);

      userData.newPassword && payload.set("newPassword", userData?.newPassword);

      setLoading(true);
      const response = await axiosInstance.put("/users", payload, {
        params: {
          userId,
        },
      });

      const { data } = response;

      setMessage({ status: data.status, message: data.message });
      setUserData({
        username: "",
        password: "",
        role: "",
        img: "",
        newPassword: "",
        confirmPassword: "",
      });
      setLoading(false);
      setTimeout(() => {
        setMessage(null);
        navigate("/admin/users");
      }, 2000);
    } catch (err) {
      const { data } = err?.response;
      setMessage({
        status: data?.status || "failure",
        message: data?.message || "An error occurred",
      });
      setLoading(false);
    }
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  {
    return !isPageLoaded || loading ? (
      <div className="load">
        <Loader />
      </div>
    ) : userData && !loading ? (
      <main className="user_profile">
        <section className="form-section">
          <div className="wrap">
            <div className="tag"> {userData.role}</div>
            <div className="profile-pic">
              <img
                src={
                  preview
                    ? preview
                    : userData.img
                    ? userData.img
                    : "/profile.webp"
                }
                className={!userData?.img ? "pad-img" : undefined}
                alt="profile-pic"
              />
              <img
                src="/camera.webp"
                onClick={handleImageUplaod}
                alt="camera"
                className="camera"
              />
            </div>

            <form action="" onSubmit={handleSubmit}>
              <div className="row">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Jon Doe"
                  value={userData.username || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={userData.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row input-grp">
                <div>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="**************"
                    value={userData.newPassword || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="**************"
                    id="confirmPassword"
                    value={userData.confirmPassword || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <input
                type="file"
                ref={hiddenFileUploader}
                name="profile-pic"
                id=""
                onChange={handleChange}
              />

              <button disabled={loading}>Update Profile</button>
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
    ) : (
      <div className="msg admin">
        <h1>{message?.message ? message?.message : "Something Went Wrong!"}</h1>
      </div>
    );
  }
};

export default EditUser;
