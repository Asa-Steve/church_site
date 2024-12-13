import { useState, useEffect } from "react";

const usePageLoad = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Setting a listener for the window onload event
    const handlePageLoad = () => {
      setIsPageLoaded(true);
    };

    if (document.readyState === "complete") {
      // If the page is already loaded
      handlePageLoad();
    } else {
      // Otherwise, wait for the window onload event
      window.addEventListener("load", handlePageLoad);
    }

    // Cleaning up the event listener
    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, []);

  return isPageLoaded;
};

export default usePageLoad;
