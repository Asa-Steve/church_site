import { useState } from "react";
import Faq from "../../components/common/Faq/Faq";
import Card from "../../components/common/photoCard/Card";
import TeamCards from "../../components/common/teamCard/TeamCards";
import "./HomePage.scss";
import { Link } from "react-router-dom";

// Helpers from Utils Folder
import team from "../../components/Utils/team";
import faqs from "../../components/Utils/faqs";


const HomePage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };
  return (
    <div>
      <section className="hero flex-me overlay">
        <div className="left">
          <h1>Welcome to church</h1>
          <p>Discover Faith. Embrace Community. Transform Lives</p>
          <p>
            Join us as we journey together in worship, love, and service. Be
            part of a vibrant community where everyone belongs.
          </p>
          <button>Discover More</button>
        </div>
        <div className="right"></div>

        <div className="items">
          <div className="item">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="53"
                viewBox="0 0 52 53"
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  transform="translate(.75 .945)"
                >
                  <polygon
                    fill="#FFF"
                    points="16.25 9.055 33.75 1.055 34.25 22.055 49.25 30.555 48.75 50.055 1.75 50.055 1.75 30.055 15.75 22.055"
                  />
                  <path
                    fill="#000"
                    fillRule="nonzero"
                    d="M30.8291237,0.327793764 C32.4434219,-0.456934546 34.3882172,0.215564754 35.1729455,1.82986299 C35.3881679,2.27260618 35.5,2.75845664 35.5,3.25073929 L35.5,3.25073929 L35.5,21.032 L45.9395122,26.2519465 C48.6471376,27.6057592 50.3886497,30.3289844 50.49485,33.3388364 L50.5,33.6309708 L50.5,47.3047329 C50.5,49.5829075 48.707493,51.4424196 46.4559163,51.549832 L46.25,51.5547329 L4.25,51.5547329 C1.97182541,51.5547329 0.112313259,49.7622259 0.00490093099,47.5106492 L0,47.3047329 L0,33.6309708 C0,30.6037535 1.65689877,27.8282344 4.30149799,26.3871992 L4.56048784,26.2519465 L15,21.032 L15,11.9336378 C15,9.62658387 16.2699921,7.51473766 18.290036,6.42896532 L18.5175456,6.31258868 Z M15,23.827 L5.67852183,28.4880145 C3.80266211,29.4259443 2.59213338,31.3069441 2.50503778,33.389789 L2.5,33.6309708 L2.5,47.3047329 C2.5,48.2229063 3.20711027,48.9759252 4.10647279,49.0489317 L4.25,49.0547329 L7.75,49.054 L7.75,35.5547329 C7.75,34.864377 8.30964406,34.3047329 9,34.3047329 C9.69035594,34.3047329 10.25,34.864377 10.25,35.5547329 L10.25,49.054 L15,49.054 L15,23.827 Z M32.9245259,2.92284476 C32.7434347,2.5503144 32.2946358,2.39512225 31.9221055,2.5762134 L31.9221055,2.5762134 L19.6105273,8.56100832 C18.3194846,9.18859854 17.5,10.4981376 17.5,11.9336378 L17.5,11.9336378 L17.5,49.0547329 L22,49.0547329 L22,49.0547329 L22,39.5547329 C22,37.7598075 23.4550746,36.3047329 25.25,36.3047329 C27.0449254,36.3047329 28.5,37.7598075 28.5,39.5547329 L28.5,49.0547329 L33,49.0547329 L33,3.25073929 C33,3.1750035 32.98853,3.09992742 32.9661673,3.02801875 L32.9661673,3.02801875 Z M35.5,23.827 L35.5,49.054 L40.25,49.054 L40.25,35.5547329 C40.25,34.864377 40.8096441,34.3047329 41.5,34.3047329 C42.1903559,34.3047329 42.75,34.864377 42.75,35.5547329 L42.75,49.054 L46.25,49.0547329 C47.1681734,49.0547329 47.9211923,48.3476226 47.9941988,47.4482601 L48,47.3047329 L48,33.6309708 C48,31.5336959 46.8589475,29.6097574 45.0349448,28.6003802 L44.8214782,28.4880145 L35.5,23.827 Z M25.25,12.3047329 C25.9403559,12.3047329 26.5,12.864377 26.5,13.5547329 L26.5,17.304 L29,17.3047329 C29.6903559,17.3047329 30.25,17.864377 30.25,18.5547329 C30.25,19.2450888 29.6903559,19.8047329 29,19.8047329 L26.5,19.804 L26.5,27.0547329 C26.5,27.7450888 25.9403559,28.3047329 25.25,28.3047329 C24.5596441,28.3047329 24,27.7450888 24,27.0547329 L24,19.804 L21.5,19.8047329 C20.8096441,19.8047329 20.25,19.2450888 20.25,18.5547329 C20.25,17.864377 20.8096441,17.3047329 21.5,17.3047329 L24,17.304 L24,13.5547329 C24,12.864377 24.5596441,12.3047329 25.25,12.3047329 Z"
                  />
                </g>
              </svg>
              <span className="ic-bg"></span>
            </div>

            <h3>Worship God</h3>
            <p>Sed nisl velit, varius a retrum eu, varius.</p>
          </div>
          <div className="item">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="53"
                viewBox="0 0 46 53"
              >
                <g fill="none" fillRule="evenodd" transform="translate(.75)">
                  <path
                    fill="#FFF"
                    d="M22.75,12 C30.7581289,12 37.25,18.4918711 37.25,26.5 L37.25,44 L37.25,44 L8.25,44 L8.25,26.5 C8.25,18.4918711 14.7418711,12 22.75,12 Z"
                  />
                  <path
                    fill="#000"
                    fillRule="nonzero"
                    d="M22.25,11 C13.2753728,11 6,18.2753728 6,27.25 L6,42.25 C6,44.5972102 7.90278981,46.5 10.25,46.5 L34.25,46.5 C36.5972102,46.5 38.5,44.5972102 38.5,42.25 L38.5,27.25 C38.5,18.2753728 31.2246272,11 22.25,11 Z M22.25,13.5 C29.8439153,13.5 36,19.6560847 36,27.25 L36,42.25 C36,43.2164983 35.2164983,44 34.25,44 L10.25,44 C9.28350169,44 8.5,43.2164983 8.5,42.25 L8.5,27.25 C8.5,19.6560847 14.6560847,13.5 22.25,13.5 Z"
                  />
                  <path
                    fill="#000"
                    d="M22.5,30 C24.8472102,30 26.75,31.9027898 26.75,34.25 L26.75,42.75 C26.75,43.4403559 26.1903559,44 25.5,44 L19.5,44 C18.8096441,44 18.25,43.4403559 18.25,42.75 L18.25,34.25 C18.25,31.9027898 20.1527898,30 22.5,30 Z"
                  />
                  <rect width="42" height="7" x="1.25" y="44" fill="#FFF" />
                  <rect
                    width="9"
                    height="2.5"
                    x="17.75"
                    y="4"
                    fill="#000"
                    rx="1.25"
                  />
                  <rect width="2.5" height="12" x="21" fill="#000" rx="1.25" />
                  <path
                    fill="#000"
                    fillRule="nonzero"
                    d="M41.25,42.75 L3.25,42.75 C1.45507456,42.75 0,44.2050746 0,46 L0,49.25 C0,51.0449254 1.45507456,52.5 3.25,52.5 L41.25,52.5 C43.0449254,52.5 44.5,51.0449254 44.5,49.25 L44.5,46 C44.5,44.2050746 43.0449254,42.75 41.25,42.75 Z M3.25,45.25 L41.25,45.25 C41.6642136,45.25 42,45.5857864 42,46 L42,49.25 C42,49.6642136 41.6642136,50 41.25,50 L3.25,50 C2.83578644,50 2.5,49.6642136 2.5,49.25 L2.5,46 C2.5,45.5857864 2.83578644,45.25 3.25,45.25 Z"
                  />
                </g>
              </svg>

              <span className="ic-bg"></span>
            </div>

            <h3>Pray for People</h3>
            <p>Sed nisl tincidunt aliquam.</p>
          </div>
          <div className="item">
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="53"
                viewBox="0 0 40 53"
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  transform="translate(.75 .75)"
                >
                  <rect width="35" height="39" x="2.25" y="2.25" fill="#FFF" />
                  <path
                    fill="#000"
                    fillRule="nonzero"
                    d="M34.25,0 L7.25,0 C3.24593556,0 0,3.24593556 0,7.25 L0,45.5 C0,48.3994949 2.35050506,50.75 5.25,50.75 L34.25,50.75 C36.5972102,50.75 38.5,48.8472102 38.5,46.5 L38.5,4.25 C38.5,1.90278981 36.5972102,0 34.25,0 Z M7.25,2.5 L34.25,2.5 C35.2164983,2.5 36,3.28350169 36,4.25 L36,46.5 C36,47.4664983 35.2164983,48.25 34.25,48.25 L5.25,48.25 C3.73121694,48.25 2.5,47.0187831 2.5,45.5 L2.5,7.25 C2.5,4.62664744 4.62664744,2.5 7.25,2.5 Z"
                  />
                  <rect width="35" height="8" x="2.25" y="41.25" fill="#FFF" />
                  <path
                    fill="#000"
                    fillRule="nonzero"
                    d="M38.5,47.5 L38.5,39.75 L6,39.75 C2.6862915,39.75 0,42.4362915 0,45.75 C0,49.0637085 2.6862915,51.75 6,51.75 L34.25,51.75 C36.5972102,51.75 38.5,49.8472102 38.5,47.5 Z M6,42.25 L36,42.25 L36,47.5 C36,48.4664983 35.2164983,49.25 34.25,49.25 L6,49.25 C4.06700338,49.25 2.5,47.6829966 2.5,45.75 C2.5,43.8170034 4.06700338,42.25 6,42.25 Z"
                  />
                  <rect
                    width="16"
                    height="4"
                    x="11.25"
                    y="18.25"
                    fill="#000"
                    rx="2"
                  />
                  <rect
                    width="4"
                    height="22"
                    x="17.25"
                    y="11.25"
                    fill="#000"
                    rx="2"
                  />
                  <rect
                    width="14"
                    height="2.5"
                    x="4.75"
                    y="44.5"
                    fill="#000"
                    rx="1.25"
                  />
                </g>
              </svg>

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
            <Card img={"./imgs/kids.jpg"} classN={"program-card"} />

            <div className="program-txt">
              <span className="diff">JOIN THE MISSION</span>
              <h3>Our Ministries</h3>
              <p>
                Sed nisl velit, varius a retrum eu, varius tincidunt metus. Sed
                tincidunt aliquam nibh at pulvinar.
              </p>

              <Link to="">Show more</Link>
            </div>
          </div>
          <div className="program sec">
            <Card img={"./imgs/images-7.jpeg"} classN={"program-card"} />
            <div className="program-txt">
              <span className="diff">JOIN THE MISSION</span>
              <h3>Weekly Programs</h3>
              <p>
                Sed nisl velit, varius a retrum eu, varius tincidunt metus. Sed
                tincidunt aliquam nibh at pulvinar.
              </p>

              <Link to="">Show more</Link>
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
              voluptatum voluptatem esse dolores aut est nostrum expedita veniam
              temporibus sunt! Quidem deserunt nulla eligendi itaque cumque
              dicta velit voluptatum repudiandae!
            </p>

            <button>Join Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
