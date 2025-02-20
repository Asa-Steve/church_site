import { useEffect, useState } from "react";
import PopUp from "../../components/common/Popup/Popup";
import "./Mass.scss";
import axiosInstance from "../../components/Utils/axiosInstance";

import usePageLoad from "../../components/Utils/usePageLoad";
import Loader from "../../components/common/Loader/Loader";

const Mass = () => {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Creating a state Object for form data
    fullName: "",
    email: "",
    requestedFor: "",
    amount: "",
    novena: 1,
    intentions: "",
    note: "",
    paymentFor: "mass_request",
  });

  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();

  // Handling Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
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

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  // Initializing transaction
  const handleProceed = async () => {
    try {
      const payload = {
        email: formData.email,
        amount: formData.amount * 100,
        callback_url: "https://mount-zion.onrender.com/payment_status",
        metadata: { ...formData },
      };
      setMessage("");

      setisLoading(true);
      const response = await axiosInstance.post("/makePayment", payload);
      const {
        status,
        data: { authorization_url: authUrl },
      } = response.data;

      if (status) {
        setMessage("Transaction Initialized, Redirecting...");
        window.location.href = authUrl;
      } else {
        setisLoading(false);
        setMessage(
          error?.response?.data?.error ??
            "🛑 Error initializing transaction, try again"
        );
      }
    } catch (error) {
      setisLoading(false);
      setMessage(
        error?.response?.data?.error ??
          "🛑 Failed to initializing transaction, try again"
      );
    }
  };

  {
    return !isPageLoaded ? (
      <Loader />
    ) : (
      <>
        <section className="top">
          <div className="overlay"></div>
          <div className="text">
            <h1>Mass Request</h1>
          </div>
        </section>
        <main>
          <PopUp
            showPopup={showPopup}
            handleCancel={handleCancel}
            handleProceed={handleProceed}
            isLoading={isLoading}
            message={message}
            price={formData.amount}
          />
          <section className="mass form-section">
            <div className="intro_text">
              <div>
                <h2>Request a Mass Intention</h2>
                <p>
                  The Holy Sacrifice of the Mass is the highest form of prayer
                  and a powerful way to intercede for loved ones, whether living
                  or deceased. At St. Matthias Catholic Church, you can request
                  a Mass to be offered for your special intentions, including:
                </p>
                <ul>
                  <li>For the repose of the soul of a loved one</li>
                  <li>For healing and thanksgiving</li>
                  <li>
                    For special blessings (birthdays, anniversaries, etc.)
                  </li>
                  <li>For personal or family intentions</li>
                </ul>
              </div>
              <div>
                <h2>How to Request a Mass</h2>
                <ol>
                  <li>
                    Fill out the request form below with the necessary details.
                  </li>
                  <li>Specify the name(s) and intention for the Mass. </li>
                  <li>Choose a preferred date (if applicable). </li>
                  <li>
                    Submit your request and allow the parish office to process
                    it.
                  </li>
                </ol>
              </div>

              <div className="disclaimer">
                If you have any questions or need further assistance, please
                contact the parish office.
              </div>
            </div>
            <div className="wrap">
              <div className="form-header">
                <h2>Please Offer Mass For</h2>
              </div>

              <form action="" onSubmit={handleSubmit}>
                <div className="row input-grp">
                  <div>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
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

                <div className="row input-grp">
                  <div>
                    <label htmlFor="req">Requested For</label>
                    <input
                      type="text"
                      id="req"
                      name="requestedFor"
                      placeholder="Requested For"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="stipend">Mass Stipend</label>
                    <input
                      type="number"
                      id="stipend"
                      name="amount"
                      min={300}
                      placeholder="$ Mass Stipend"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <label htmlFor="novena"> Novena</label>
                  <select
                    id="novena"
                    name="novena"
                    value={formData.novena}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        novena: e.target.value,
                      }))
                    }
                  >
                    {...Array(9)
                      .keys()
                      .map((val) => (
                        <option value={val + 1}>
                          {val + 1} day{val + 1 !== 1 && "s"}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="row">
                  <label htmlFor="intentions">Intentions</label>
                  <textarea
                    name="intentions"
                    id="intentions"
                    placeholder="Write Intention Here....."
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="row">
                  <label htmlFor="intentions">Leave us a Note</label>
                  <textarea
                    name="note"
                    id="note"
                    placeholder="Leave us any additional Note describing how you would want the mass done..."
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button>Submit Mass Request</button>
              </form>
            </div>
          </section>
        </main>
      </>
    );
  }
};

export default Mass;
