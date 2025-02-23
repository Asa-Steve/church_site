import { useState } from "react";
import Faq from "../../components/common/Faq/Faq";
import Card from "../../components/common/photoCard/Card";
import TeamCards from "../../components/common/teamCard/TeamCards";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import usePageLoad from "../../components/Utils/usePageLoad";
import Loader from "../../components/common/Loader/Loader";

// Helpers from Utils Folder
import team from "../../components/Utils/team";
import faqs from "../../components/Utils/faqs";

const HomePage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  {
    return !isPageLoaded ? (
      <Loader />
    ) : (
      <>
        <section className="hero flex-me overlay">
          <div className="left">
            <h1>Welcome to church</h1>
            <p>Celebrate Faith. Embrace Community. Live the Gospel.</p>
            <p>
              Join us in the Holy Mass, prayer, and fellowship as we grow in
              faith and serve one another in Christ.
            </p>

            <Link to="/about">Learn More</Link>
          </div>
          <div className="right"></div>

          <div className="items">
            <div className="item">
              <div className="icon">
                <img src="/imgs/bell.svg" alt="" />
                <span className="ic-bg"></span>
              </div>

              <h3>Worship God</h3>
              <p>Encounter Christ in the Holy Mass and sacraments.</p>
            </div>
            <div className="item">
              <div className="icon">
                <img src="/imgs/church.svg" alt="" />
                <span className="ic-bg"></span>
              </div>

              <h3>Pray for Others</h3>
              <p>Lift up your intentions in prayer and intercession.</p>
            </div>
            <div className="item">
              <div className="icon">
                <img src="/imgs/bible.svg" alt="" />
                <span className="ic-bg"></span>
              </div>

              <h3>Hear His Word</h3>
              <p>Grow in faith through Scripture and Church teachings.</p>
            </div>
          </div>
        </section>

        <section className="wave">
          <div className="programs">
            <div className="program">
              <Card
                img={"./imgs/kids.webp"}
                alt={"donate-img"}
                classN={"program-card"}
              />

              <div className="program-txt">
                <span className="diff">JOIN THE MISSION</span>
                <h3>Our Ministries</h3>
                <p>
                  Serve Christ and the Church through our ministries—choir,
                  catechism, outreach, and more. Find your calling and be part
                  of our mission.
                </p>

                <Link to="/society">Explore Ministries</Link>
              </div>
            </div>
            <div className="program sec">
              <Card
                img={"./imgs/images-7.webp"}
                alt={"weekly-program-img"}
                classN={"program-card"}
              />
              <div className="program-txt">
                <span className="diff">JOIN THE MISSION</span>
                <h3>Weekly Programs</h3>
                <p>
                  Join us for daily and Sunday Mass, Adoration, Bible study, and
                  parish activities to deepen your faith.
                </p>

                <Link to="/activities">View Schedule</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="team">
          <span className="diff">TEAM</span>
          <h3>Our Priests</h3>
          <div className="cards">
            {team.map((teamMember, idx) => (
              <TeamCards
                key={idx}
                to={`./priest/${idx + 1}`}
                img={teamMember.imgUrl}
                name={teamMember.name}
                desc={teamMember.desc}
                title={teamMember.title}
              />
            ))}
          </div>
        </section>

        <section className="faq">
          <div className="top">
            <span className="diff">MOST ASKED</span>
            <h3>Frequently Asked</h3>
          </div>

          <div className="wrapper">
            <div className="left">
              <div className="questions flex-me">
                {faqs.map((question, idx) => {
                  return (
                    <Faq
                      key={idx}
                      handleToggle={() => toggleFaq(idx)}
                      title={question.title}
                      question={question.que}
                      isActive={activeFaq === idx}
                    />
                  );
                })}
              </div>
            </div>
            <div className="divider"></div>
            <div className="right">
              <h3>Have Any questions ?</h3>
              <p>
                We’re here to guide you! Whether it’s about receiving the
                sacraments, joining the parish, or participating in ministries,
                feel free to reach out.
              </p>

              <Link to={"/contact"}>Contact Us</Link>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default HomePage;
