import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Link } from "react-router-dom";

import "./Activities.scss";

// importing icons
import ChurchIcon from "@mui/icons-material/Church";
const Activities = () => {
  return (
    <div className="weekly_activities">
      <div className="intro">
        <h1>
          WELCOME TO ST. MATTHIAS CATHOLIC CHURCH.
          <br />
          AMARATA, BAYELSA STATE.
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nemo
          incidunt delectus aspernatur accusamus sint velit beatae cumque? Id in
          rem atque! Eum maxime beatae error. Blanditiis nihil
          exercitationemnemo incidunt delectus aspernatur accusamus sint velit
          beatae cumque? Id in rem atque! Eum maxime beatae error. Blanditiis
          nihil exercitationemnemo incidunt delectus aspernatur accusamus sint
          velit beatae cumque? Id in rem atque! Eum maxime beatae error.
          Blanditiis nihil exercitationem natus?
        </p>
      </div>
      <VerticalTimeline
        intersectionObserverProps={{
          rootMargin: "0px 0px 100px 0px", // Adjust margin for delayed triggering
          threshold: 0.5, // Adjust visibility trigger
        }}
        lineColor="#001220"
      >
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#001220" }}
          contentArrowStyle={{ borderRight: "7px solid  #001220" }}
          date="Sundays"
          iconStyle={{ background: "#ff0066", color: "#fff" }}
          icon={<ChurchIcon />}
        >
          <div>
            <h2>Sunday Masses Schedule</h2>
            <div className="schedules">
              <div className="schedule">
                <h5 className="schedule-title">
                  1<sup>st</sup> Mass
                </h5>
                <h5 className="schedule-body">6:30 AM</h5>
              </div>
              <div className="schedule">
                <h5 className="schedule-title">
                  2<sup>nd</sup> Mass
                </h5>
                <h5 className="schedule-body">8:45 AM</h5>
              </div>
              <div className="schedule">
                <h5 className="schedule-title">
                  3<sup>rd</sup> Mass
                </h5>
                <h5 className="schedule-body">10:45 AM</h5>
              </div>
              <p className="note">
                Note: this is subject to Change kindly reach us to confirm{" "}
                <Link to={"/contact"}>Help Desk</Link>
              </p>
            </div>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#001220" }}
          contentArrowStyle={{ borderRight: "7px solid  #001220" }}
          date="Mondays"
          iconStyle={{ background: "#ff0066", color: "#fff" }}
          icon={<ChurchIcon />}
        >
          <div>
            <h2>Evening Mass Schedule</h2>
            <div className="schedules">
              <div className="schedule">
                <h5 className="schedule-title">
                  1<sup>st</sup> The Rosary
                </h5>
                <h5 className="schedule-body">5:00 PM</h5>
              </div>
              <div className="schedule">
                <h5 className="schedule-title">
                  2<sup>nd</sup> The Holy Mass
                </h5>
                <h5 className="schedule-body">6:00 PM</h5>
              </div>
              <p className="note">
                Note: this is subject to Change kindly reach us to confirm{" "}
                <Link to={"/contact"}>Help Desk</Link>
              </p>
            </div>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default Activities;
