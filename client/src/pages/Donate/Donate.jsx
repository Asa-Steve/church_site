import { useState, useEffect } from "react";
import "./Donate.scss";
import axiosInstance from "../../components/Utils/axiosInstance";
import Popup from "../../components/common/Popup/Popup";
import usePageLoad from "../../components/Utils/usePageLoad";
import Loader from "../../components/common/Loader/Loader";
import { initiatePayment } from "../../components/Utils/paymentService";
const Donate = () => {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  // Creating a state Object for form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    amount: "",
    paymentFor: "donation",
  });

  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();

  // Handling Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  // Closing Popup
  const handleCancel = () => {
    setMessage("");
    setShowPopup(false);
  };

  // Handling Input Change when typing
  const handleChange = (e) => {
    // Handle input changes dynamically
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update only the field that changed
    }));
  };

  // Clearing message
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  // Initializing transaction
  const handleProceed = async () => {
    initiatePayment(formData, setMessage, setisLoading);
  };

  {
    return !isPageLoaded ? (
      <Loader />
    ) : (
      <>
        <section className="top">
          <div className="overlay"></div>
          <div className="text">
            <h1>Donate</h1>
          </div>
        </section>
        <main>
          <Popup
            showPopup={showPopup}
            handleCancel={handleCancel}
            handleProceed={handleProceed}
            isLoading={isLoading}
            message={message}
            price={formData.amount}
          />

          <section className="donate form-section">
            <div className="intro_text">
              <div>
                <h2>Support St. Matthias Catholic Church</h2>
                <p>
                  Your generosity helps sustain the mission of St. Matthias
                  Catholic Church, enabling us to continue spreading the Gospel,
                  supporting parish ministries, and serving those in need. Every
                  contribution, no matter the size, makes a meaningful impact.
                </p>
              </div>
              <div>
                <h2>Why Donate?</h2>
                <ul>
                  <li>
                    <strong>Support Parish Activities –</strong>Help fund
                    liturgical celebrations, pastoral programs, and community
                    outreach.
                  </li>
                  <li>
                    <strong>Church Building Project –</strong>Be a part of the
                    growth of our parish by contributing to the construction and
                    improvement of our church facilities. Your donation helps
                    create a sacred space for worship, prayer, and community
                    gatherings.
                  </li>
                  <li>
                    <strong>Assist the Less Privileged – </strong> Your
                    donations help provide aid to those in need within our
                    community.
                  </li>
                  <li>
                    <strong>Maintain Our Church –</strong>Contribute to the
                    upkeep of our place of worship and facilities.
                  </li>
                </ul>
              </div>
              <div>
                <h2>Ways to Give</h2>
                <ul>
                  <li>
                    <strong>Online Giving –</strong>Use the secure form on this
                    page to make a one-time donation.
                  </li>
                  <li>
                    <strong>Visit the Parish Office –</strong>Stop by the church
                    office to make your donation in person.
                  </li>
                </ul>
              </div>
              <div>
                <p>
                  You can make direct bank transfers to either of these account
                  numbers
                </p>
                <span>9167670473</span>
              </div>
            </div>
            <div className="wrap">
              <div className="form-header">
                <h2>Donation Form</h2>
              </div>

              <form action="" onSubmit={handleSubmit}>
                <div className="row">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    id="name"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="row input-grp">
                  <div>
                    <label htmlFor="ph">Phone Number</label>
                    <input
                      type="number"
                      name="phoneNo"
                      id="ph"
                      min={0}
                      placeholder="Phone Number"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="Donation_sum">
                    How Much Do you Wish To Donate ?
                  </label>
                  <span id="cur_icon">₦</span>
                  <input
                    type="number"
                    id="Donation_sum"
                    placeholder="Donation Amount"
                    name="amount"
                    min={1000}
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button>Donate Now !</button>
              </form>
            </div>
          </section>
        </main>
      </>
    );
  }
};

export default Donate;
