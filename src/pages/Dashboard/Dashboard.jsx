import "./Dashboard.scss";
import { Link } from "react-router-dom";


// import Line from "../Line/LineChart";

// import { Doughnut } from 'react-chartjs-2';


// const data = {
//     labels: [
//         'Red',
//         'Blue',
//         'Yellow'
//     ],
//     datasets: [{
//         label: 'My First Dataset',
//         data: [300, 50, 100],
//         backgroundColor: [
//             'rgb(255, 99, 132)',
//             'rgb(54, 162, 235)',
//             'rgb(255, 205, 86)'
//         ],
//         hoverOffset: 4
//     }]
// };

const Dashboard = () => {
    return (
        <>
            <div className="dash">
                <div className="left_dash">
                    <div className="logo">
                        <div className="logo_img">
                            <img src="./imgs/1.png" alt="logo" />
                        </div>
                        <div className="admin_name">
                            <h1>ADMIN</h1>
                            <i>Dev Steve</i>
                        </div>
                    </div>
                    <div className="menu">
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/1.png" alt="" />Dashboard</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/1.png" alt="" />Dashboard</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/2.png" alt="" />Directory</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/3.png" alt="" />Pages</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/4.png" alt="" />Application</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/12.png" alt="" />Component</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/3.png" alt="" />Pages</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/4.png" alt="" />Application</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/12.png" alt="" />Component</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/3.png" alt="" />Pages</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/4.png" alt="" />Application</Link>
                        </div>
                        <div className="linked">
                            <div className="blob"></div>
                            <Link><img src="./imgs/dash_ic/12.png" alt="" />Component</Link>
                        </div>

                    </div>
                </div>
                <div className="right_dash">
                    <div className="top-bar">
                        <form action="">
                            <input type="text" placeholder="search here..." />
                            <button><img src="./imgs/dash_ic/search.png" alt="" /></button>
                        </form>
                        <div className="user_deit">
                            <div className="icons">
                                <div className="icon"><img src="./imgs/dash_ic/9.png" alt="" /></div>
                                <div className="icon"><img src="./imgs/dash_ic/4.png" alt="" /></div>
                                <div className="profile-pic">
                                    <img src="./imgs/pastor3.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mid-bar">
                        <div className="dash-subtitle"><h2>Directory Dashboard</h2></div>
                        <div className="dash-breadcrumb"><p>Dashboard ► Address</p></div>
                    </div>

                    <div className="main">
                        <div className="chart">
                            <div className="left">
                                <div className="left_info">
                                    <div className="info_txt">
                                        <h4>Monthly income stat for September 2024</h4>
                                    </div>
                                    <div className="filter">
                                        <div className="td">Today</div>
                                        <div className="wk">Weekly</div>
                                        <div className="mt">Monthly</div>
                                    </div>
                                </div>
                                <div className="plot">

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
                                        <div className="td">Today</div>
                                        <div className="wk">Weekly</div>
                                        <div className="mt">Monthly</div>
                                    </div>
                                </div>
                                <div className="plot">

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

export default Dashboard;
