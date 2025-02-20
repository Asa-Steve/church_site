import React, { useEffect, useState } from "react";
import "./About.scss";
import Faq from "../../components/common/Faq/Faq";
import TeamCards from "../../components/common/teamCard/TeamCards";

// Helpers from Utils Folder
import team from "../../components/Utils/team";
import faqs from "../../components/Utils/faqs";
import missionStatement from "../../components/Utils/missionStatement";
import usePageLoad from "../../components/Utils/usePageLoad";
import Loader from "../../components/common/Loader/Loader";
import axiosInstance from "../../components/Utils/axiosInstance";

import Spinner from "../../components/common/Spinner/Spinner";
import ContactForm from "../../components/common/ContactForm/ContactForm";

const About = () => {
  // State Managed Variables
  const [activeFaq, setActiveFaq] = useState(0);
  const [data, setData] = useState(null);
  const [showMessage, setShowMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // Creating a state Object for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();

  // Handling Input Change when typing
  const handleChange = (e) => {
    // Handle input changes dynamically
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update only the field that changed
    }));
  };

  // Handling Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/mail", { ...formData });

      // saving the result gotten from the server
      const result = await response.data;

      //saving it onto the state variable
      setData(result);

      // Resetting my form fields
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Showing message (success to user)
      setShowMessage(true);

      setLoading(false);
    } catch (error) {
      // Showing message (failure to user)
      setShowMessage(true);
      setLoading(false);

      setData({
        status: "failure",
        message: "Failed to send message!",
      });
    }

    setTimeout(() => {
      // Removing message after 2sec
      setShowMessage(false);
      setData(null);
    }, 2000);
  };

  // Toggler Logic for FAQ
  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? activeFaq : idx);
  };

  {
    return !isPageLoaded ? (
      <Loader />
    ) : (
      <>
        <section className="top">
          <div className="overlay"></div>
          <div className="text">
            <h1>About St. Matthias Catholic Church</h1>
          </div>
        </section>
        <section className="about_sect">
          <div className="header_title">
            <h2>We love God. We believe in God.</h2>
            <div className="subtitle">
              <p>
                At St. Matthias Catholic Church, we are a community of faith,
                rooted in the Eucharist and guided by the Gospel. Our mission is
                to spread God’s love through worship, service, and fellowship.
              </p>
            </div>
          </div>
          <div className="mission_stat">
            <div className="left">
              {missionStatement.map((item) => (
                <div className="stat" key={item.id}>
                  <span className="num">{item.id}</span>
                  <div className="stat-info">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="right">
              <img src="./imgs/about-us-bg.webp" alt="" />
            </div>
          </div>

          <div className="about_faq">
            <div className="header_title">
              <h2>Questions About the Church</h2>
              <div className="subtitle">
                <p>
                  Have any questions or need assistance? Reach out to us via
                  email, or visit the parish office.
                </p>
              </div>
            </div>
            <div className="contact_info_sect">
              <div className="left">
                <div className="form-section">
                  <div className="wrap">
                    <ContactForm
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      loading={loading}
                      data={data}
                      showMessage={showMessage}
                      formData={formData}
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="faqs">
                  {faqs.map((question, idx) => {
                    return (
                      <Faq
                        key={idx}
                        handleToggle={() => toggleFaq(idx)}
                        title={question.title}
                        question={question.que}
                        isActive={activeFaq === idx}
                        sch={question?.sch}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="about_our_team">
            <div className="header_title">
              <h2>Meet Our Priests & Religious</h2>
              <div className="subtitle">
                <p>
                  Our dedicated clergy and religious serve with faith and
                  commitment, guiding our parish community in worship, pastoral
                  care, and spiritual growth.
                </p>
              </div>
            </div>

            <div className="cards">
              {team.map((teamMember, idx) => (
                <TeamCards
                  key={idx}
                  to={`/priest/${idx + 1}`}
                  img={teamMember.imgUrl}
                  name={teamMember.name}
                  desc={teamMember.desc}
                  title={teamMember.title}
                />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default About;
