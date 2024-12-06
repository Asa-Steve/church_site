import { useState } from "react";
import PopUp from "../../components/common/Popup/Popup";
import "./Mass.scss";
import axios from "axios";

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
      callback_url: "https://mount-zion.onrender.com/payment_status",
      metadata: { ...formData },
    };
    setMessage("");

    console.log(payload);
    // setisLoading(true);

    try {
      setisLoading(true);
      const response = await axios.post(
        "https://church-site-server.onrender.com/api/v1/makePayment",
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
      console.log(error);

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
        <section className="form-section">
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
};

export default Mass;
