import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Error from './components/Error/Error.jsx'
import './index.scss'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import HomePage from './components/HomePage/HomePage.jsx'
import Priest from './components/priest/Priest.jsx'
import Mass from './components/Mass/Mass.jsx'
import Donate from './components/Donate/Donate.jsx'
import Article from './components/Article/Article.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import DashboardLayout from './DashboradLayout.jsx'
import Baptism from './components/Baptism/Baptism.jsx'
import PaymentSuccess from "./components/PaymentSuccessful/Payment_Success.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/article",
        element: <Article />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/mass",
        element: <Mass />
      },
      {
        path: "/donate",
        element: <Donate />
      },
      {
        path: "/priest/:pid",
        element: <Priest />
      },
      {
        path: "/baptism",
        element: <Baptism />
      },
      ,
      {
        path: "/payment_successful",
        element: <PaymentSuccess />
      }
    ]
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);