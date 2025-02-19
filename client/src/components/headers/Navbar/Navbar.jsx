import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

import { useLocation } from "react-router-dom";

// Importing Icons
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Navbar = () => {
  const [slideIn, setSlideIn] = useState(false);
  const [showDropMb, setShowDropMb] = useState(false);

  const { pathname } = useLocation();

  const handleSlideIN = () => {
    setSlideIn(!slideIn);
    setShowDropMb(false);
  };

  useEffect(() => {
    setSlideIn(false);
  }, [pathname]);

  return (
    <>
      <nav className="flex-me">
        <div className="nav-logo-wrap">
          <NavLink to="/" className={"nav-logo flex-me"}>
            <div className="img-wrap-logo">
              <img src="/imgs/logo3.png" alt="logo" />
            </div>
            <span>st.matthias</span>
          </NavLink>
        </div>

        <div className="nav-links flex-me">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/articles"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Articles
          </NavLink>
          <div className="nav-item dropdown">
            Quick Links
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink
                to="/baptism"
                className={({ isActive }) =>
                  isActive ? "dropdown-item active" : "dropdown-item"
                }
              >
                infant Baptism
              </NavLink>
              <NavLink
                to="/searchrecord"
                className={({ isActive }) =>
                  isActive ? "dropdown-item active" : "dropdown-item"
                }
              >
                Search Archive for Records
              </NavLink>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive ? "dropdown-item active" : "dropdown-item"
                }
              >
                Church History
              </NavLink>
            </ul>
          </div>
          <NavLink
            to="/mass"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Mass Request
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/donate"
            className={({ isActive }) => (isActive ? "cta active" : "cta")}
          >
            Donate
          </NavLink>
        </div>

        <div
          className={`${slideIn ? "nav-links-mb slide-in" : "nav-links-mb"}`}
        >
          <div className="close">
            <svg
              onClick={handleSlideIN}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="40px"
              height="40px"
            >
              <path d="M 11.480469 5.0058594 C 10.500482 5.0058442 9.521297 5.3771405 8.7792969 6.1191406 L 6.1191406 8.7792969 C 4.6346201 10.26247 4.6351404 12.69764 6.1191406 14.181641 L 15.9375 24 L 6.1191406 33.818359 C 4.6346201 35.301533 4.6351404 37.736703 6.1191406 39.220703 L 8.7792969 41.880859 C 10.26247 43.36538 12.69764 43.36486 14.181641 41.880859 L 24 32.0625 L 33.818359 41.880859 C 35.301533 43.36538 37.736703 43.36486 39.220703 41.880859 L 41.880859 39.220703 C 43.36538 37.73753 43.36486 35.30236 41.880859 33.818359 L 32.0625 24 L 41.880859 14.181641 C 43.36538 12.698467 43.36486 10.263297 41.880859 8.7792969 L 39.220703 6.1191406 C 37.73753 4.6346201 35.30236 4.6351404 33.818359 6.1191406 L 24 15.9375 L 14.181641 6.1191406 C 13.440054 5.3768804 12.460456 5.0058746 11.480469 5.0058594 z M 11.480469 6.9921875 C 11.944232 6.9921723 12.408165 7.1734634 12.767578 7.5332031 L 23.292969 18.058594 A 1.0001 1.0001 0 0 0 24.707031 18.058594 L 35.232422 7.5332031 C 35.952422 6.8132033 37.087814 6.8137237 37.806641 7.5332031 L 40.466797 10.193359 C 41.186797 10.913359 41.186276 12.048752 40.466797 12.767578 L 29.941406 23.292969 A 1.0001 1.0001 0 0 0 29.941406 24.707031 L 40.466797 35.232422 C 41.186797 35.952422 41.186276 37.087814 40.466797 37.806641 L 37.806641 40.466797 C 37.086641 41.186797 35.951248 41.186276 35.232422 40.466797 L 24.707031 29.941406 A 1.0001 1.0001 0 0 0 23.292969 29.941406 L 12.767578 40.466797 C 12.047578 41.186797 10.912186 41.186276 10.193359 40.466797 L 7.5332031 37.806641 C 6.8132033 37.086641 6.8137237 35.951248 7.5332031 35.232422 L 18.058594 24.707031 A 1.0001 1.0001 0 0 0 18.058594 23.292969 L 7.5332031 12.767578 C 6.8132033 12.047578 6.8137237 10.912186 7.5332031 10.193359 L 10.193359 7.5332031 C 10.553359 7.1732032 11.016706 6.9922027 11.480469 6.9921875 z" />
            </svg>
          </div>
          <div className="links-mb">
            <NavLink
              to="/"
              onClick={handleSlideIN}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleSlideIN}
              to="/about"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              About Us
            </NavLink>
            <NavLink
              onClick={handleSlideIN}
              to="/articles"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Articles
            </NavLink>
            <div
              className="nav-item-drop-mb"
              style={{
                maxHeight: showDropMb ? "250px" : "",
                border: showDropMb
                  ? "1px solid rgba(128, 128, 128, 0.559)"
                  : "",
                backgroundColor: showDropMb && "initial !important",
              }}
            >
              <div>
                <span
                  onClick={() => {
                    setShowDropMb((prevState) => !prevState);
                  }}
                >
                  Quick Links
                </span>
                <KeyboardArrowRightIcon
                  style={{
                    transform: showDropMb ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                  id="arrow_drop"
                  onClick={() => setShowDropMb((prevState) => !prevState)}
                />
              </div>

              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "dropdown-item active" : "dropdown-item"
                  }
                  onClick={handleSlideIN}
                  to="/baptism"
                >
                  infant Baptism
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "dropdown-item active" : "dropdown-item"
                  }
                  onClick={handleSlideIN}
                  to="/searchrecord"
                >
                  Search Archive for records
                </NavLink>
                <hr className="dropdown-divider" />
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "dropdown-item active" : "dropdown-item"
                  }
                  onClick={handleSlideIN}
                  to="/history"
                >
                  Church History
                </NavLink>
              </ul>
            </div>
            <NavLink
              onClick={handleSlideIN}
              to="/mass"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Mass Request
            </NavLink>
            <NavLink
              onClick={handleSlideIN}
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Contact Us
            </NavLink>
            <NavLink
              onClick={handleSlideIN}
              to="/donate"
              className={({ isActive }) => (isActive ? "cta" : "cta")}
            >
              Donate
            </NavLink>
          </div>
        </div>
        <div
          className="hb-menu-ic"
          style={{ display: slideIn ? "none" : undefined }}
        >
          <svg
            onClick={handleSlideIN}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="40px"
            height="40px"
            baseProfile="basic"
          >
            <path d="M39,29H9c-1.657,0-3-1.343-3-3v-3h36v3C42,27.657,40.657,29,39,29z" />
            <path
              fill="#fff"
              d="M39,27H9c-1.105,0-2-0.895-2-2v-3h34v3C41,26.105,40.105,27,39,27z"
            />
            <path d="M39,28H9c-1.654,0-3-1.346-3-3v-3c0-0.553,0.448-1,1-1h34c0.552,0,1,0.447,1,1v3C42,26.654,40.654,28,39,28z M8,23v2	c0,0.552,0.449,1,1,1h30c0.551,0,1-0.448,1-1v-2H8z" />
            <path d="M39,17H9c-1.657,0-3-1.343-3-3v-3h36v3C42,15.657,40.657,17,39,17z" />
            <path
              fill="#fff"
              d="M39,15H9c-1.105,0-2-0.895-2-2v-3h34v3C41,14.105,40.105,15,39,15z"
            />
            <path d="M39,16H9c-1.654,0-3-1.346-3-3v-3c0-0.553,0.448-1,1-1h34c0.552,0,1,0.447,1,1v3C42,14.654,40.654,16,39,16z M8,11v2	c0,0.552,0.449,1,1,1h30c0.551,0,1-0.448,1-1v-2H8z" />
            <path d="M39,41H9c-1.657,0-3-1.343-3-3v-3h36v3C42,39.657,40.657,41,39,41z" />
            <path
              fill="#fff"
              d="M39,39H9c-1.105,0-2-0.895-2-2v-3h34v3C41,38.105,40.105,39,39,39z"
            />
            <path d="M39,40H9c-1.654,0-3-1.346-3-3v-3c0-0.553,0.448-1,1-1h34c0.552,0,1,0.447,1,1v3C42,38.654,40.654,40,39,40z M8,35v2	c0,0.552,0.449,1,1,1h30c0.551,0,1-0.448,1-1v-2H8z" />
          </svg>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
