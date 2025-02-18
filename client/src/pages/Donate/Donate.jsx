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
