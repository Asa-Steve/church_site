import "./Dashboard.scss";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../components/common/Loader/Loader";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

// Import for Chart Component
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import axiosInstance from "../../../components/Utils/axiosInstance";

const Dashboard = () => {
  const [fetchedData, setfetchedData] = useState(null);
  const [loading, setIsloading] = useState(true);
  const [message, setMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  // Checking if User is Admin and authorized to view Page
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return navigate("/login"); // No token, user is not authenticated
        }
        const user = jwtDecode(token);
        if (user.role !== "superAdmin") {
          setIsAdmin(false);
          throw new Error("Youre Not Authorized to view this page.");
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.log("erro fa: ", error);
        setIsloading(false);
        setMessage(error.message);
        navigate("/admin/articles");
        return;
      } finally {
        setIsloading(false);
      }
    };

    verifyUser();
  }, []);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const response = await axiosInstance.get("/payments");
        console.log(response.data);
        setIsloading(false);
        setfetchedData({
          data: response.data.data,
          monthlyData: response?.data?.totalAmount,
          totalInfants: response?.data?.totalInfantsReg,
          totalMassReqs: response?.data?.totalMassReqs,
          totalUsers: response?.data?.totalUsers,
        });
      } catch (error) {
        console.log(error);
        setIsloading(false);
        setMessage("Couldn't get Payments at the moment try again later");
      }
    };
    getPayments();
  }, [isAdmin]);

  {
    return loading ? (
      <div className="load">
        <Loader />
      </div>
    ) : fetchedData?.length < 1 || !fetchedData ? (
      <div className="msg admin">
        <h1>{message ? message : "No Request Found."}</h1>
      </div>
    ) : isAdmin ? (
      <>
        <div className="dashboard">
          <div className="main">
            <div className="chart">
              <div className="left">
                <div className="left_info">
                  <div className="info_txt">
                    <h4>
                      Monthly income stat for {fetchedData?.monthlyData?.month}
                    </h4>
                  </div>
                </div>
                <div className="plot">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={100}
                      height={100}
                      data={fetchedData?.data}
                      margin={{
                        top: 25,
                        right: 10,
                        left: -7,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="inf_baptism"
                        stroke="#ff0066"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="donations"
                        stroke="#001220"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="right">
                <div className="cats">
                  <div className="cat">
                    <h3>
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(fetchedData?.monthlyData?.total)}
                    </h3>
                    <p>Total Amount Generated</p>
                  </div>
                  <div className="cat">
                    <h3>{fetchedData?.totalInfants}</h3>
                    <p>Total Infants Registered</p>
                  </div>
                  <div className="cat">
                    <h3>{fetchedData?.totalMassReqs}</h3>
                    <p>Total Mass Booked</p>
                  </div>
                  <div className="cat">
                    <h3>{fetchedData?.totalUsers - 1}</h3>
                    <p>Registered Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="msg admin">
        <h1>{message ? message : "Something Went Wrong!"}</h1>
      </div>
    );
  }
};

export default Dashboard;
