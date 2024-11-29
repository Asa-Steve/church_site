import { Outlet } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/headers/Navbar/Navbar";
import Footer from "./components/headers/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
