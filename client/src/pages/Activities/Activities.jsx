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
    <>
      <section className="top">
        <div className="overlay"></div>
        <div className="text">
          <h1>Weekly Activities</h1>
        </div>
      </section>
      <section className="weekly_activities">
        <div className="intro">
          <h1>
            Welcome to St. Matthias Catholic Church, Amarata Yenagoa, Bayelsa
            State.
          </h1>
          <p>
            Welcome to St. Matthias Catholic Church, Amarata, Yenagoa! <br />
            Our parish is a vibrant faith community committed to worship,
            service, and spiritual growth. We offer a variety of activities to
            help members deepen their faith, build strong relationships, and
            actively participate in the life of the Church. <br />
            Below, you will find details about our scheduled Masses, prayer
            gatherings, and other church events. We encourage all parishioners
            to take part in these activities as we journey together in faith.
          </p>
        </div>
        <VerticalTimeline
          intersectionObserverProps={{
            rootMargin: "0px 0px 100px 0px", // Adjust margin for delayed triggering
            threshold: 0.5, // Adjust visibility trigger
          }}
          lineColor="#001220"
        >
          {Array(4)
            .fill(1)
            .map((_, idx) => (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: "#001220" }}
                contentArrowStyle={{ borderRight: "7px solid  #001220" }}
                date="Sundays"
                iconStyle={{ background: "#ff0066", color: "#fff" }}
                icon={<ChurchIcon />}
                key={idx}
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
            ))}
        </VerticalTimeline>
      </section>
    </>
  );
};

export default Activities;
