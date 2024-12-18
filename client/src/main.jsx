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
import Dashboard from "./pages/Admin_pages/Dashboard/Dashboard.jsx";
import Baptism from "./pages/Baptism/Baptism.jsx";
import PaymentSuccess from "./pages/PaymentSuccessful/Payment_Success.jsx";
import AddPost from "./pages/AddPost/AddPost.jsx";
import Login from "./pages/Login/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import EditPost from "./pages/EditPost/EditPost.jsx";
import AllPost from "./pages/Admin_pages/AllPost/AllPost.jsx";
import MassRequest from "./pages/Admin_pages/MassRequests/MassRequest.jsx";

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
        path: "/mass",
        element: <Mass />,
      },
      {
        path: "/donate",
        element: <Donate />,
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
    // path: "/admin",
    // element: <DashboardLayout />,
    // errorElement: <Error />,
    // children: [
    //   {
    //     path: "",
    //     element: <Dashboard />,
    //   },
    // ],
    path: "/admin",
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/article/addpost",
        element: <AddPost />,
      },
      {
        index: true,
        element: <AllPost />,
      },
      {
        path: "/admin/article/edit/:articleSlug",
        element: <EditPost />,
      },
      {
        path: "/admin/requests",
        element: <MassRequest />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
