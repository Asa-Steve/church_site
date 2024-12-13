import { Link } from "react-router-dom";
import "./Footer.scss";
import { useState } from "react";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <footer className="Footer">
      <div className="wrapper">
        <div className="col-1">
          <div className="logo-bottom">
            <Link to="/" className="nav-logo-bottom flex-me">
              <div className="img-wrap-logo">
                <img src="/imgs/logo3.png" alt="" />
              </div>
              <span>st.matthias</span>
            </Link>
          </div>
          <p>
            Lorem ipsum dolor sit amet,explicabo velit quod quibusdam rem
            tempore minus! consectetur adipisicing elit. Officia, explicabo
            velit quod quibusdam rem tempore minus! Architecto debitis.
          </p>
          <div className="socials">
            <span>twiter</span>
            <span>facebook</span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="col-2">
          <div className="diff">Quick Links</div>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/donate">Donate</Link>
            {isLoggedIn ? (
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
      <div className="copy">
        All rights reserved &copy; Designed By Steve with 💖
      </div>
    </footer>
  );
};

export default Footer;
