import React, { useState, useEffect } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";
import axiosInstance from "./components/Utils/axiosInstance";
import Loader from "./components/common/Loader/Loader";
import "./ProtectedRoute.scss";
import { jwtDecode } from "jwt-decode";

// Importing Icons
import ChurchIcon from "@mui/icons-material/Church";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ContactsIcon from "@mui/icons-material/Contacts";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ArchiveIcon from "@mui/icons-material/Archive";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InsightsIcon from "@mui/icons-material/Insights";
import LogoutIcon from "@mui/icons-material/Logout";
import Breadcrumb from "./components/common/Breadcrumb/Breadcrumb";
import FindInPageIcon from "@mui/icons-material/FindInPage";

const ProtectedRoute = () => {
  const [isVerified, setIsVerified] = useState(null);
  const [showToggle, setShowToggle] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCatechist, setIsCatechist] = useState(false);
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

        if (user?.role === "superAdmin" || user?.role === "secretary") {
          setIsAdmin(true);
        }
        if (user?.role === "catechist") {
          setIsCatechist(true);
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
    return <Loader />; // Optionally Show a loading spinner while verifying
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
              <NavLink end to={"/admin"} onClick={handleClick}>
                <div className="blob"></div>
                <div className="linked">
                  <InsightsIcon />
                  Insight
                </div>
              </NavLink>
            )}
            {!isCatechist && (
              <NavLink
                to={"/admin/articles"}
                onClick={handleClick}
                className={({ isActive }) => (isActive ? "active" : "")}
                end
              >
                <div className="blob"></div>
                <div className="linked">
                  <DynamicFeedIcon />
                  All Posts
                </div>
              </NavLink>
            )}
            {(isAdmin || !isCatechist) && (
              <NavLink
                to={"/admin/articles/create"}
                onClick={handleClick}
                className={({ isActive }) => (isActive ? "active" : "")}
                end
              >
                <div className="blob"></div>
                <div className="linked">
                  <PostAddIcon />
                  Add Post
                </div>
              </NavLink>
            )}

            {isAdmin && (
              <NavLink end to={"/admin/users/create"} onClick={handleClick}>
                <div className="blob"></div>
                <div className="linked">
                  <GroupAddIcon />
                  Add User
                </div>
              </NavLink>
            )}
            {isAdmin && (
              <NavLink
                to={"/admin/users"}
                onClick={handleClick}
                end
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className="blob"></div>
                <div className="linked">
                  <GroupIcon />
                  View All Users
                </div>
              </NavLink>
            )}
            {isAdmin && (
              <NavLink end to={"/admin/records/create"} onClick={handleClick}>
                <div className="blob"></div>
                <div className="linked">
                  <ArchiveIcon />
                  Add Record
                </div>
              </NavLink>
            )}

            <NavLink end to={"/admin/records"} onClick={handleClick}>
              <div className="blob"></div>
              <div className="linked">
                <FindInPageIcon />
                Find Record
              </div>
            </NavLink>

            {(isAdmin || isCatechist) && (
              <NavLink
                to={"/admin/requests"}
                onClick={handleClick}
                className={({ isActive }) => (isActive ? "active" : "")}
                end
              >
                <div className="blob"></div>
                <div className="linked">
                  <ContentCopyIcon />
                  Mass Requests
                </div>
              </NavLink>
            )}

            {(isAdmin || isCatechist) && (
              <NavLink
                to={"/admin/infants"}
                onClick={handleClick}
                className={({ isActive }) => (isActive ? "active" : "")}
                end
              >
                <div className="blob"></div>
                <div className="linked">
                  <ContactsIcon />
                  Infant Registrations
                </div>
              </NavLink>
            )}

            <NavLink
              to={"/admin/users/profile"}
              onClick={handleClick}
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              <div className="blob"></div>
              <div className="linked">
                <AppRegistrationIcon />
                Edit Profile
              </div>
            </NavLink>

            <NavLink
              to={"/"}
              onClick={handleClick}
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              <div className="blob"></div>
              <div className="linked">
                <ChurchIcon />
                Return to website
              </div>
            </NavLink>

            <Link onClick={handleLogout}>
              <div className="linked">
                <LogoutIcon />
                Logout
              </div>
            </Link>
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
              <Breadcrumb />
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
