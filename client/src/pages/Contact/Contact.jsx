import React, { useState } from "react";
import "./Contact.scss";
import usePageLoad from "../../components/Utils/usePageLoad";
import Loader from "../../components/common/Loader/Loader";
import Map from "../../components/common/Map/Map";
import Spinner from "../../components/common/Spinner/Spinner";
import axiosInstance from "../../components/Utils/axiosInstance";
import ContactForm from "../../components/common/ContactForm/ContactForm";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [showMessage, setShowMessage] = useState(null);

  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();

  // Handling Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

      if (error?.response) {
        const { data } = error.response;
        error.message = data?.message || "Failed to send message!";
      }

      setData({
        status: "failure",
        message: error?.message,
      });
    }

    // Removing message after 2sec
    setTimeout(() => {
      setShowMessage(false);
      setData(null);
    }, 2000);
  };

  {
    return !isPageLoaded ? (
      <Loader />
    ) : (
      <>
        <section className="top">
          <div className="overlay"></div>
          <div className="text">
            <h1>Contact Us</h1>
          </div>
        </section>

        <section className="contact_section">
          <div className="header_title">
            <h2>Call Us or Fill the Form</h2>
            <div className="subtitle">
              <p>
                Fill out the contact form below, and we will get back to you as
                soon as possible. We look forward to hearing from you and
                welcoming you into our parish community!
              </p>
              <p>
                We are here to assist you with any inquiries, spiritual needs,
                or sacramental requests. Feel free to reach out through any of
                the following means:
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
              <div className="channels">
                <div className="chan1">
                  <h3 className="title">Address:</h3>
                  <p>
                    St. Matthias Catholic Church,
                    <br />
                    Amarata, Yenagoa Bayelsa State.
                  </p>
                </div>
                <div className="chan2">
                  <h3 className="title">Email:</h3>
                  <a href="">
                    <p>contact@example.com</p>
                  </a>
                  <a href="">
                    <p>support@example.com</p>
                  </a>
                </div>
                <div className="chan1">
                  <h3 className="title">Phone:</h3>
                  <a href="">
                    <p>mobile: +07 554 332 322</p>
                  </a>
                  <a href="">
                    <p>fax: +06 444 646 442</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="map">
            <div className="wrap">
              <Map />
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default Contact;
