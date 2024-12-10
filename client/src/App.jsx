import { Outlet } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/headers/Navbar/Navbar";
import Footer from "./components/headers/Footer/Footer";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";
import { useRef } from "react";

function App() {
  const containerRef = useRef(null);
  return (
    <>
      <Navbar />
      <div ref={containerRef} className="content">
        <ScrollToTop targetRef={containerRef} />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
