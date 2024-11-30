import { useState } from "react";
import "./Donate.scss";
import axios from "axios";
import Popup from "../../components/common/Popup/Popup";

const Donate = () => {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Creating a state Object for form data
    fullName: "",
    email: "",
    phoneNo: "",
    amount: "",
    paymentFor: "donation",
  });

  // Handling Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  // Setting a display message for user
  const setPop = (msg) => {
    console.log("got called with msg :", msg);

    setMessage(msg);

    // setTimeout(() => {
    //   setMessage("");
    // }, 3000);
  };

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

  // Initializing transaction
  const handleProceed = async () => {
    const payload = {
      email: formData.email,
      amount: formData.amount * 100,
      callback_url: "http://localhost:5173/payment_status",
      metadata: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNo,
        paymentFor: formData.paymentFor,
      },
    };
    setMessage("");

    console.log(payload);

    try {
      setisLoading(true);
      const response = await axios.post(
        "http://localhost:3000/initialize-transaction",
        payload
      );
      const {
        status,
        data: { authorization_url: authUrl },
      } = response.data;

      if (status) {
        console.log("Transaction Initialized:", authUrl);
        setPop("Transaction Initialized, Redirecting...");
        window.location.href = authUrl;
      } else {
        setisLoading(false);
        setPop(
          error?.response?.data?.error ??
            "🛑 Error initializing transaction, try again"
        );
      }
    } catch (error) {
      setisLoading(false);
      setPop(
        error?.response?.data?.error ??
          "🛑 Failed to initializing transaction, try again"
      );
    }
  };

  return (
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
};

export default Donate;
