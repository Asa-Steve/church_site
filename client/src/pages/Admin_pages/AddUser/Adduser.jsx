import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../../components/Utils/axiosInstance";
import usePageLoad from "../../../components/Utils/usePageLoad";
import Loader from "../../../components/common/Loader/Loader";
import { jwtDecode } from "jwt-decode";

import "./AddUser.scss";
import { useNavigate } from "react-router-dom";

const Adduser = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "Editor",
    img: "",
  });
  const [isLoading, setIsLoading] = useState(null);
  const hiddenFileUploader = useRef(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/login"); // No token, user is not authenticated
        }
        const user = jwtDecode(token);
        if (user.role !== "superAdmin") {
          setIsAdmin(false);
          throw new Error("Youre Not Authorized to view this page.");
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        setMessage(error.message);
        return;
      }
    };

    verifyUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile-pic" && files) {
      setPreview(URL.createObjectURL(files[0]));
      return setUserData((prevData) => ({ ...prevData, img: files[0] }));
    }
    return setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUplaod = () => {
    hiddenFileUploader.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.set("username", userData?.username);
      payload.set("password", userData?.password);
      payload.set("role", userData?.role);
      payload.set("img", userData?.img);

      setIsLoading(true);
      const response = await axiosInstance.post("/users/create", payload);
      const { data } = response;
      setMessage({ ...data });
      setUserData({
        username: "",
        password: "",
        role: "Editor",
        img: "",
      });
      setIsLoading(false);
    } catch ({ response: { data: err } }) {
      setMessage({ ...err });
      setIsLoading(false);
    }

    setTimeout(() => {
      setMessage(null);
      navigate("/admin/users/");
    }, 3000);
  };

  {
    return !isPageLoaded || isLoading ? (
      <div className="load">
        <Loader />
      </div>
    ) : isAdmin ? (
      <main className="add_user">
        <section className="form-section">
          <div className="wrap">
            <div className="tag"> New User</div>
            <div className="profile-pic">
              <img
                src={preview ? preview : "/profile.webp"}
                className={!preview ? "pad-img" : undefined}
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
              {/* <h2>Add New User</h2> */}
              <div className="row">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Jon Doe"
                  value={userData.username}
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
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="file"
                ref={hiddenFileUploader}
                name="profile-pic"
                id=""
                onChange={handleChange}
              />

              <div className="row">
                <label htmlFor="role">Select Role</label>
                <select
                  id="role"
                  name="role"
                  value={userData.role}
                  onChange={(e) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      role: e.target.value,
                    }))
                  }
                >
                  <option value="Editor">Editor</option>
                  <option value="SuperAdmin">Super Admin</option>
                </select>
              </div>
              <button disabled={isLoading}>Add User</button>
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
        <h1>{message ? message : "Something Went Wrong!"}</h1>
      </div>
    );
  }
};

export default Adduser;
