import React from "react";
import "./Error.scss";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="error_wrap">
        <div className="error_overlay"></div>
        <div className="write_up">
          <div className="top">
            <span>404</span>
            <span>Page Not Found</span>
          </div>
          <div className="bottom">
            <span>
              {" "}
              return to <Link to={"/"}>homepage</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
