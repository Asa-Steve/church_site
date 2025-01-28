import "./Breadcrumb.scss";
import { useLocation, NavLink } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const Breadcrumb = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/").filter((path) => path);

  if (pathname.includes("edit") && pathname.indexOf("edit")) {
    const truncPath = pathname.slice(0, pathname.indexOf("edit") + 1);

    return (
      <nav className="breadcrumb">
        <NavLink to={"/"}>home</NavLink>;
        {truncPath.map((path, pathIdx) => {
          const isLast = pathIdx === pathname.indexOf("edit");
          const pathTo = pathname.slice(0, pathIdx + 1).join("/");

          return (
            <span key={pathIdx}>
              <KeyboardArrowRightIcon />
              {!isLast ? (
                <NavLink to={`/${pathTo}`}>{path}</NavLink>
              ) : (
                <p>{path}</p>
              )}
            </span>
          );
        })}
      </nav>
    );
  } else {
    return (
      <nav className="breadcrumb">
        <NavLink to={"/"}>home</NavLink>

        {pathname.map((path, pathIdx) => {
          const isLast = pathIdx === pathname.length - 1;
          const pathTo = pathname.slice(0, pathIdx + 1).join("/");

          return (
            <span key={pathIdx}>
              <KeyboardArrowRightIcon />
              {!isLast ? (
                <NavLink to={`/${pathTo}`}>{path}</NavLink>
              ) : (
                <p>{path}</p>
              )}
            </span>
          );
        })}
      </nav>
    );
  }
};

export default Breadcrumb;
