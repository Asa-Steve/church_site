import React, { useState, useEffect } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import axiosInstance from "./components/Utils/axiosInstance";
import Loader from "./components/common/Loader/Loader";
import "./ProtectedRoute.scss";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const [isVerified, setIsVerified] = useState(null);
  const [showToggle, setShowToggle] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsVerified(false); // No token, user is not authenticated
        return;
      }

      try {
        const user = jwtDecode(token);
        setCurrentUser(user);

        if (user?.role === "superAdmin") {
          setIsAdmin(true);
        }

        const response = await axiosInstance.post("/users/verify-token");

        if (response.data.success) {
          setIsVerified(true); // Token is valid
        } else {
          setIsVerified(false); // Token is invalid
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsVerified(false);
      }
    };

    verifyToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleClick();
    navigate("/");
  };

  const handleClick = () => {
    setShowToggle((prev) => !prev);
  };

  if (isVerified === null) {
    return <Loader />; // Optional: Show a loading spinner while verifying
  }

  return isVerified ? (
    <>
      <div className="dash">
        <div
          className="toggler"
          style={{ display: showToggle ? undefined : "none" }}
          onClick={() => setShowToggle((prev) => !prev)}
        >
          <img src="/imgs/tag.webp" alt="toggler" />
        </div>
        <div className={!showToggle ? "left_dash active" : "left_dash"}>
          <div className="close" onClick={() => setShowToggle((prev) => !prev)}>
            X
          </div>
          <div className="logo">
            <div className="logo_img">
              <img
                src={currentUser.img ? currentUser.img : "/imgs/login.png"}
                alt={currentUser.username}
              />
            </div>
            <div className="admin_name">
              <h1>{currentUser.username}</h1>
              <i>{currentUser.role}</i>
            </div>
          </div>

          <div className="menu">
            {isAdmin && (
              <div className="linked">
                <div className="blob"></div>
                <Link to={"/admin/dashboard"} onClick={handleClick}>
                  <img src="/imgs/dash_ic/1.png" alt="" />
                  Dashboard
                </Link>
              </div>
            )}
            {isAdmin && (
              <div className="linked">
                <div className="blob"></div>
                <Link to={"/admin/users/create"} onClick={handleClick}>
                  <img src="/imgs/dash_ic/1.png" alt="" />
                  Add User
                </Link>
              </div>
            )}
            {isAdmin && (
              <div className="linked">
                <div className="blob"></div>
                <Link to={"/admin/users/"} onClick={handleClick}>
                  <img src="/imgs/dash_ic/1.png" alt="" />
                  View All Users
                </Link>
              </div>
            )}
            <div className="linked">
              <div className="blob"></div>
              <Link to={"/admin/article/create"} onClick={handleClick}>
                <img src="/imgs/dash_ic/2.png" alt="" />
                Add Post
              </Link>
            </div>
            <div className="linked">
              <div className="blob"></div>
              <Link to={"/admin"} onClick={handleClick}>
                <img src="/imgs/dash_ic/3.png" alt="" />
                All Posts
              </Link>
            </div>

            <div className="linked">
              <div className="blob"></div>
              <Link to={"/admin/requests"} onClick={handleClick}>
                <img src="/imgs/dash_ic/3.png" alt="" />
                Mass Requests
              </Link>
            </div>
            <div className="linked">
              <div className="blob"></div>
              <Link to={"/"} onClick={handleClick}>
                <img src="/icons/undo.png" alt="" />
                Return to website
              </Link>
            </div>

            <div className="linked">
              <div className="blob"></div>
              <Link onClick={handleLogout}>
                <img src="/imgs/dash_ic/12.png" alt="" />
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="right_dash">
          <div className="top-bar">
            <form action="">
              <input type="text" placeholder="search here..." />
              <button>
                <img src="/imgs/dash_ic/search.png" alt="" />
              </button>
            </form>
            <div className="user_deit">
              <div className="icons">
                <div className="icon">
                  <img src="/imgs/dash_ic/9.png" alt="" />
                </div>
                <div className="icon">
                  <img src="/imgs/dash_ic/4.png" alt="" />
                </div>
                <div className="profile-pic">
                  <img src="/imgs/pastor3.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="mid-bar">
            <div className="dash-subtitle">
              <h2>Directory Dashboard</h2>
            </div>
            <div className="dash-breadcrumb">
              <p>Dashboard ► Address</p>
            </div>
          </div>

          <div className="main">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;

// function DashboardLayout() {
//   return (
//     <>
//       {/* No Navbar */}
//       <div className="content">
//         <Outlet />
//       </div>
//     </>
//   );
// }

// export default DashboardLayout;
