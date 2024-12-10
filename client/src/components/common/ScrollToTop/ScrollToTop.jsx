import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ targetRef }) => {
  const { pathname } = useLocation();

  const handleScrollToTop = () => {
    targetRef.current.scrollTo(0, 0);
  };

  //scrolling to top of page when url changes page
  useEffect(() => {
    handleScrollToTop();
  }, [pathname]);
  return null;
};

export default ScrollToTop;
