import "./Breadcrumb.scss";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Breadcrumb = () => {
  const location = useLocation();
  console.log(location);
  const pathname = location.pathname.split("/").filter((path) => path);
  console.log(pathname);

  if (pathname.includes("edit") && pathname.indexOf("edit")) {
    console.log("pathname :", pathname.indexOf("edit"));

    const truncPath = pathname.slice(0, pathname.indexOf("edit") + 1);

    console.log("truncPath: ", truncPath);
    return (
      <nav className="breadcrumb">
        <Link to={"/"}>home</Link>;
        {truncPath.map((path, pathIdx) => {
          const isLast = pathIdx === pathname.indexOf("edit");
          const pathTo = pathname.slice(0, pathIdx + 1).join("/");

          return (
            <>
              <KeyboardArrowRightIcon />
              {!isLast ? <Link to={`/${pathTo}`}>{path}</Link> : <p>{path}</p>}
            </>
          );
        })}
      </nav>
    );
  } else {
    return (
      <nav className="breadcrumb">
        <Link to={"/"}>home</Link>

        {pathname.map((path, pathIdx) => {
          const isLast = pathIdx === pathname.length - 1;
          const pathTo = pathname.slice(0, pathIdx + 1).join("/");

          return (
            <>
              <KeyboardArrowRightIcon />
              {!isLast ? <Link to={`/${pathTo}`}>{path}</Link> : <p>{path}</p>}
            </>
          );
        })}
      </nav>
    );
  }
};

export default Breadcrumb;
