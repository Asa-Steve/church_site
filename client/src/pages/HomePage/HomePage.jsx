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
            <p>Discover Faith. Embrace Community. Transform Lives</p>
            <p>
              Join us as we journey together in worship, love, and service. Be
              part of a vibrant community where everyone belongs.
            </p>

            <Link to="/about">Discover More</Link>
          </div>
          <div className="right"></div>

          <div className="items">
            <div className="item">
              <div className="icon">
                <img src="/imgs/bell.svg" alt="" />
                <span className="ic-bg"></span>
              </div>

              <h3>Worship God</h3>
              <p>Sed nisl velit, varius a retrum eu, varius.</p>
            </div>
            <div className="item">
              <div className="icon">
                <img src="/imgs/church.svg" alt="" />
                <span className="ic-bg"></span>
              </div>

              <h3>Pray for People</h3>
              <p>Sed nisl tincidunt aliquam.</p>
            </div>
            <div className="item">
              <div className="icon">
                <img src="/imgs/bible.svg" alt="" />
                <span className="ic-bg"></span>
              </div>

              <h3>Listen His Word</h3>
              <p>tincidunt metus. Sed tincidunt aliquam.</p>
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
                  Sed nisl velit, varius a retrum eu, varius tincidunt metus.
                  Sed tincidunt aliquam nibh at pulvinar.
                </p>

                <Link to="/donate">Show more</Link>
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
                  Sed nisl velit, varius a retrum eu, varius tincidunt metus.
                  Sed tincidunt aliquam nibh at pulvinar.
                </p>

                <Link to="/activities">Show more</Link>
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
                voluptatum voluptatem esse dolores aut est nostrum expedita
                veniam temporibus sunt! Quidem deserunt nulla eligendi itaque
                cumque dicta velit voluptatum repudiandae!
              </p>

              <Link to={"/about"}>Join Us</Link>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default HomePage;
