import "./Dashboard.scss";
import { Link } from "react-router-dom";
import usePageLoad from "../../../components/Utils/usePageLoad";
import Loader from "../../../components/common/Loader/Loader";

import React, { PureComponent, useState } from "react";
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

// Dummy Data Generator
// [
//   {
//     name: "JAN",
//     inf_baptism: genRand(),
//     donations: genRand(),
//     amt: genRand(),
//   },
//   {
//     name: "FEB",
//     inf_baptism: genRand(),
//     donations: genRand(),
//     amt: genRand(),
//   },
//   {
//     name: "APR",
//     inf_baptism: genRand(),
//     donations: genRand(),
//     amt: genRand(),
//   },
//   {
//     name: "MAY",
//     inf_baptism: genRand(),
//     donations: genRand(),
//     amt: genRand(),
//   },
//   {
//     name: "JUN",
//     inf_baptism: genRand(),
//     donations: genRand(),
//     amt: genRand(),
//   },
//   {
//     name: "JUL",
//     inf_baptism: genRand(),
//     donations: genRand(),
//     amt: genRand(),
//   },
// ];

const genRand = () => Math.floor(Math.random() * 8000 + 2000);

const Dashboard = () => {
  const [data, setData] = useState([
    {
      name: "JAN",
      inf_baptism: 3000,
      donations: 1398,
      amt: 2210,
    },
    {
      name: "FEB",
      inf_baptism: 2000,
      donations: 9800,
      amt: 2290,
    },
    {
      name: "MAR",
      inf_baptism: 2780,
      donations: 3908,
      amt: 2000,
    },
    {
      name: "APR",
      inf_baptism: 1890,
      donations: 4800,
      amt: 2181,
    },
    {
      name: "MAY",
      inf_baptism: 2390,
      donations: 3800,
      amt: 2500,
    },
    {
      name: "JUN",
      inf_baptism: 3490,
      donations: 4300,
      amt: 2100,
    },
    {
      name: "JUL",
      inf_baptism: 4000,
      donations: 2400,
      amt: 2400,
    },
    {
      name: "AUG",
      inf_baptism: genRand(),
      donations: genRand(),
      amt: genRand(),
    },
    {
      name: "SEP",
      inf_baptism: genRand(),
      donations: genRand(),
      amt: genRand(),
    },
    {
      name: "OCT",
      inf_baptism: genRand(),
      donations: genRand(),
      amt: genRand(),
    },
    {
      name: "NOV",
      inf_baptism: genRand(),
      donations: genRand(),
      amt: genRand(),
    },
    {
      name: "DEC",
      inf_baptism: genRand(),
      donations: genRand(),
      amt: genRand(),
    },
  ]);
  const [activeFilter, setActiveFilter] = useState(3);
  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();

  const handleWeekly = () => {
    const weeklyData = [
      {
        name: "W1",
        inf_baptism: 9216,
        donations: 2912,
        amt: 2191,
      },
      {
        name: "W2",
        inf_baptism: 8085,
        donations: 8703,
        amt: 7089,
      },
      {
        name: "W3",
        inf_baptism: 4051,
        donations: 5428,
        amt: 3236,
      },
      {
        name: "W4",
        inf_baptism: 8413,
        donations: 6969,
        amt: 8705,
      },
      {
        name: "W5",
        inf_baptism: 4064,
        donations: 9487,
        amt: 9088,
      },
    ];
    setData(weeklyData);
    setActiveFilter(2);
  };

  const handleDaily = () => {
    let dailyData = [
      {
        name: "SUN",
        inf_baptism: 8505,
        donations: 2348,
        amt: 3917,
      },
      {
        name: "MON",
        inf_baptism: 7296,
        donations: 2035,
        amt: 6951,
      },
      {
        name: "TUE",
        inf_baptism: 9059,
        donations: 3477,
        amt: 2259,
      },
      {
        name: "WED",
        inf_baptism: 7090,
        donations: 8646,
        amt: 2164,
      },
      {
        name: "THUR",
        inf_baptism: 9158,
        donations: 5467,
        amt: 3720,
      },
      {
        name: "FRI",
        inf_baptism: 7697,
        donations: 2999,
        amt: 3648,
      },
      {
        name: "SAT",
        inf_baptism: 9697,
        donations: 5999,
        amt: 3648,
      },
    ];
    setData(dailyData);
    setActiveFilter(1);
  };

  const handleMonthly = () => {
    const MonthlyData = [
      {
        name: "JAN",
        inf_baptism: 3000,
        donations: 1398,
        amt: 2210,
      },
      {
        name: "FEB",
        inf_baptism: 2000,
        donations: 9800,
        amt: 2290,
      },
      {
        name: "MAR",
        inf_baptism: 2780,
        donations: 3908,
        amt: 2000,
      },
      {
        name: "APR",
        inf_baptism: 1890,
        donations: 4800,
        amt: 2181,
      },
      {
        name: "MAY",
        inf_baptism: 2390,
        donations: 3800,
        amt: 2500,
      },
      {
        name: "JUN",
        inf_baptism: 3490,
        donations: 4300,
        amt: 2100,
      },
      {
        name: "JUL",
        inf_baptism: 4000,
        donations: 2400,
        amt: 2400,
      },
      {
        name: "AUG",
        inf_baptism: genRand(),
        donations: genRand(),
        amt: genRand(),
      },
      {
        name: "SEP",
        inf_baptism: genRand(),
        donations: genRand(),
        amt: genRand(),
      },
      {
        name: "OCT",
        inf_baptism: genRand(),
        donations: genRand(),
        amt: genRand(),
      },
      {
        name: "NOV",
        inf_baptism: genRand(),
        donations: genRand(),
        amt: genRand(),
      },
      {
        name: "DEC",
        inf_baptism: genRand(),
        donations: genRand(),
        amt: genRand(),
      },
    ];
    setData(MonthlyData);
    setActiveFilter(3);
  };
  {
    return !isPageLoaded ? (
      <Loader />
    ) : (
      <>
        <div className="dash">
          <div className="right_dash">
            <div className="main">
              <div className="chart">
                <div className="left">
                  <div className="left_info">
                    <div className="info_txt">
                      <h4>Monthly income stat for September 2024</h4>
                    </div>
                    <div className="filter">
                      <div
                        className={activeFilter === 1 ? "td active" : "td"}
                        onClick={handleDaily}
                      >
                        Today
                      </div>
                      <div
                        className={activeFilter === 2 ? "wk active" : "wk"}
                        onClick={handleWeekly}
                      >
                        Weekly
                      </div>
                      <div
                        className={activeFilter === 3 ? "mt active" : "mt"}
                        onClick={handleMonthly}
                      >
                        Monthly
                      </div>
                    </div>
                  </div>
                  <div className="plot">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        width={100}
                        height={200}
                        data={data}
                        margin={{
                          top: 25,
                          right: 10,
                          left: 10,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
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
                      <h3>5,000+</h3>
                      <p>Total Enrollment</p>
                    </div>
                    <div className="cat">
                      <h3>500+</h3>
                      <p>Total Listings</p>
                    </div>
                    <div className="cat">
                      <h3>1,000+</h3>
                      <p>Claimed Listings</p>
                    </div>
                    <div className="cat">
                      <h3>1,000+</h3>
                      <p>Reported Listings</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="stat">
                <div className="left">
                  <div className="left_info">
                    <div className="info_txt">
                      <h4>Monthly income stat for September 2024</h4>
                    </div>
                    <div className="filter">
                      <div
                        className={activeFilter === 1 ? "td active" : "td"}
                        onClick={handleDaily}
                      >
                        Today
                      </div>
                      <div
                        className={activeFilter === 2 ? "wk active" : "wk"}
                        onClick={handleWeekly}
                      >
                        Weekly
                      </div>
                      <div
                        className={activeFilter === 3 ? "mt active" : "mt"}
                        onClick={handleMonthly}
                      >
                        Monthly
                      </div>
                    </div>
                  </div>
                  <div className="plot">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="inf_baptism"
                          fill="#ff0066"
                          activeBar={<Rectangle fill="pink" stroke="blue" />}
                        />
                        <Bar
                          dataKey="donations"
                          fill="#001220"
                          activeBar={<Rectangle fill="gold" stroke="purple" />}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="right">
                  <div className="cats">
                    <div className="cat">
                      <h3>5,000+</h3>
                      <p>Total Enrollment</p>
                    </div>
                    <div className="cat">
                      <h3>500+</h3>
                      <p>Total Listings</p>
                    </div>
                    <div className="cat">
                      <h3>1,000+</h3>
                      <p>Claimed Listings</p>
                    </div>
                    <div className="cat">
                      <h3>1,000+</h3>
                      <p>Reported Listings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Dashboard;
