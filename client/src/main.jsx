// Disable React Developer Tools in production
if (process.env.NODE_ENV === "production") {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    for (const [key, value] of Object.entries(
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__
    )) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
        typeof value === "function" ? () => {} : null;
    }
  }
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Error from "./pages/Error/Error.jsx";
import "./index.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Priest from "./pages/priest/Priest.jsx";
import Mass from "./pages/Mass/Mass.jsx";
import Donate from "./pages/Donate/Donate.jsx";
import Articles from "./pages/Articles/Articles.jsx";
import Article from "./pages/Article/Article.jsx";
import Activities from "./pages/Activities/Activities.jsx";
import Baptism from "./pages/Baptism/Baptism.jsx";
import PaymentSuccess from "./pages/PaymentSuccessful/Payment_Success.jsx";
import Login from "./pages/Login/Login.jsx";
import Reset from "./pages/Reset/Reset.jsx";
import ForgotPw from "./pages/ForgotPw/ForgotPw.jsx";
import History from "./pages/History/History.jsx";
import Society from "./pages/Society/Society.jsx";

// Admin Pages (Require Auth)
import Dashboard from "./pages/Admin_pages/Dashboard/Dashboard.jsx";
import EditPost from "./pages/Admin_pages/EditPost/EditPost.jsx";
import AddPost from "./pages/Admin_pages/AddPost/AddPost.jsx";
import AllPost from "./pages/Admin_pages/AllPost/AllPost.jsx";
import MassRequest from "./pages/Admin_pages/MassRequests/MassRequest.jsx";
import Adduser from "./pages/Admin_pages/AddUser/Adduser.jsx";
import AllUsers from "./pages/Admin_pages/AllUsers/AllUsers.jsx";
import InfantBaptism from "./pages/Admin_pages/InfantBaptism/InfantBaptism.jsx";
import Records from "./pages/Admin_pages/Records/Records.jsx";
import SearchRecord from "./pages/SearchRecord/SearchRecord.jsx";
import ViewRecord from "./pages/Admin_pages/ViewRecord/ViewRecord.jsx";
import EditProfile from "./pages/Admin_pages/EditProfile/EditProfile.jsx";
import EditUser from "./pages/Admin_pages/EditUser/EditUser.jsx";
import EditRecord from "./pages/Admin_pages/EditRecord/EditRecord.jsx";

// Layout for Authenticated Users
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/articles",
        element: <Articles />,
      },
      {
        path: "/articles/:articleSlug",
        element: <Article />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/searchrecord",
        element: <SearchRecord />,
      },
      {
        path: "/mass",
        element: <Mass />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      {
        path: "/reset-password/:resetToken",
        element: <Reset />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPw />,
      },
      {
        path: "/priest/:pid",
        element: <Priest />,
      },
      {
        path: "/baptism",
        element: <Baptism />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/society",
        element: <Society />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/payment_status",
        element: <PaymentSuccess />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/admin/articles/create",
        element: <AddPost />,
      },
      {
        path: "/admin/articles",
        element: <AllPost />,
      },
      {
        path: "/admin/articles/edit/:articleSlug",
        element: <EditPost />,
      },
      {
        path: "/admin/users",
        element: <AllUsers />,
      },
      {
        path: "/admin/users/create",
        element: <Adduser />,
      },
      {
        path: "/admin/users/edit/:userId",
        element: <EditUser />,
      },
      {
        path: "/admin/requests",
        element: <MassRequest />,
      },
      {
        path: "/admin/infants",
        element: <InfantBaptism />,
      },
      {
        path: "/admin/records/create",
        element: <Records />,
      },
      {
        path: "/admin/records",
        element: <ViewRecord />,
      },
      {
        path: "/admin/records/edit/:recordId",
        element: <EditRecord />,
      },
      {
        path: "/admin/users/profile",
        element: <EditProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
