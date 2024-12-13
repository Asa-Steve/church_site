import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axiosInstance from "./components/Utils/axiosInstance";

const ProtectedRoute = () => {
  const [isVerified, setIsVerified] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsVerified(false); // No token, user is not authenticated
        return;
      }

      try {
        const response = await axiosInstance.post("/user/verify-token");

        if (response.data.success) {
          setIsVerified(true); // Token is valid
        } else {
          setIsVerified(false); // Token is invalid
        }
      } catch (error) {
        setIsVerified(false);
      }
    };

    verifyToken();
  }, []);

  if (isVerified === null) {
    return <div>Loading...</div>; // Optional: Show a loading spinner while verifying
  }

  return isVerified ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;

// function DashboardLayout() {
//   return (
//     <>
//       {/* No Navbar */}
//       <div className="content">
//         <Outlet />
//       </div>
//     </>
//   );
// }

// export default DashboardLayout;
