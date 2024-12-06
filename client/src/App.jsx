import { Outlet } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/headers/Navbar/Navbar";
import Footer from "./components/headers/Footer/Footer";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
