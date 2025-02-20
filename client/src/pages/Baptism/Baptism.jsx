import { useState, useEffect } from "react";
import axiosInstance from "../../components/Utils/axiosInstance";
import "./Baptism.scss";
import PopUp from "../../components/common/Popup/Popup";
import usePageLoad from "../../components/Utils/usePageLoad";
import Loader from "../../components/common/Loader/Loader";
import { initiatePayment } from "../../components/Utils/paymentService";

const Baptism = () => {
  // State Managed Variables
  const [message, setMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  // Creating a state Object for form data
  const [formData, setFormData] = useState({
    baptismName: "",
    otherName: "",
    surname: "",
    dob: "",
    email: "",
    birthPlace: "",
    fatherName: "",
    motherName: "",
    parentPhone: "",
    homeTown: "",
    lga: "",
    state: "",
    residenceAddr: "",
    wedded: "",
    sponsor: "",
    amount: 1000,
    paymentFor: "infant_baptism",
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
    setShowPopup(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  // Initializing transaction
  const handleProceed = async () => {
    initiatePayment(formData, setMessage, setisLoading);
  };

  // Closing Popup
  const handleCancel = () => {
    setMessage("");
    setShowPopup(false);
  };

  {
    return !isPageLoaded ? (
      <Loader />
    ) : (
      <>
        <section className="top">
          <div className="overlay"></div>
          <div className="text">
            <h1>Infant Baptism Registration</h1>
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
          <section className="baptism form-section">
            <div className="intro_text">
              <div>
                <h2>Infant Baptism Registration</h2>
                <p>
                  Baptism is the first sacrament of initiation into the Catholic
                  Church. Through this sacred rite, your child is welcomed into
                  the Christian community and receives the grace of new life in
                  Christ. We are honored to assist you in preparing for your
                  child's baptism. Please fill out the form below with the
                  required details.
                </p>
                <h2>Baptism Fee</h2>
                <p>
                  A standard contribution of <span style={{color:"red"}}>₦1,500</span> is required to
                  help cover administrative and liturgical expenses. If you have
                  any financial concerns, please contact the parish office.
                </p>
              </div>
              <div>
                <h2>Requirements for Infant Baptism</h2>
                <ul>
                  <li>
                    At least one parent or guardian must be a practicing
                    Catholic.
                  </li>
                  <li>
                    Parents must commit to raising the child in the Catholic
                    faith.
                  </li>
                  <li>
                    Godparents should be practicing Catholics who have received
                    the sacraments of Baptism, Eucharist, and Confirmation.
                  </li>
                  <li>
                    A brief pre-baptismal instruction session may be required.
                  </li>
                </ul>
              </div>

              <div className="disclaimer">
                The baptismal fee is not a charge for the sacrament but a
                contribution to support the parish's preparation and materials.
                No child will be denied baptism due to financial difficulties.
              </div>
            </div>
            <div className="wrap">
              <div className="form-header">
                <h2>Baptism Registration Form</h2>
              </div>

              <form action="" onSubmit={handleSubmit}>
                <div className="row input-grp">
                  <div>
                    <label htmlFor="Baptism_name">Child's Baptismal Name</label>
                    <input
                      type="text"
                      name="baptismName"
                      id="Baptism_name"
                      placeholder="Baptismal Name"
                      onChange={handleChange}
                      value={formData.baptismName}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="Other_name">Child's Other Name</label>
                    <input
                      type="text"
                      name="otherName"
                      id="Other_name"
                      placeholder="Other Name"
                      onChange={handleChange}
                      value={formData.otherName}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="surname">Surname</label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      placeholder="Surname"
                      onChange={handleChange}
                      value={formData.surname}
                      required
                    />
                  </div>
                </div>

                <div className="row input-grp">
                  <div>
                    <label htmlFor="dob">Date Of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      onChange={handleChange}
                      value={formData.dob}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="place_birth">Place of Birth</label>
                    <input
                      type="text"
                      name="birthPlace"
                      id="place_birth"
                      placeholder="e.g FMC yenagoa Bayelsa State."
                      onChange={handleChange}
                      value={formData.birthPlace}
                      required
                    />
                  </div>
                </div>

                <div className="row input-grp">
                  <div>
                    <label htmlFor="father">Father's Name</label>
                    <input
                      type="text"
                      name="fatherName"
                      id="father"
                      placeholder="Enter Father's Name"
                      onChange={handleChange}
                      value={formData.fatherName}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="mother">Mother's Name</label>
                    <input
                      type="text"
                      name="motherName"
                      id="mother"
                      placeholder="Enter Mother's Name"
                      onChange={handleChange}
                      value={formData.motherName}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label htmlFor="mail">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      id="mail"
                      placeholder="E.g examplemail@gmail.com"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label htmlFor="parent_ph">Parent's Phone NO</label>
                    <input
                      type="number"
                      name="parentPhone"
                      id="parent_ph"
                      min={0}
                      placeholder="E.g +234 7035 545 521"
                      onChange={handleChange}
                      value={formData.parentPhone}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label htmlFor="home_town">Father's Home Town</label>
                    <input
                      type="text"
                      name="homeTown"
                      id="home_town"
                      placeholder="Kolokuma/Opokuma Bayelsa state"
                      onChange={handleChange}
                      value={formData.homeTown}
                      required
                    />
                  </div>
                </div>
                <div className="row input-grp">
                  <div>
                    <label htmlFor="LGA">L.G.A</label>
                    <input
                      type="text"
                      name="lga"
                      id="LGA"
                      placeholder="Enter Local Government Area"
                      onChange={handleChange}
                      value={formData.lga}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      name="state"
                      id="mother"
                      placeholder="Enter State of Origin"
                      onChange={handleChange}
                      value={formData.state}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div>
                    <label htmlFor="residence_add">Residential Adress</label>
                    <input
                      type="text"
                      name="residenceAddr"
                      id="residence_add"
                      placeholder="E.g Off Azikoro Road, Opposite Lagold street Ekeki, Yenagoa Bayelsa state."
                      onChange={handleChange}
                      value={formData.residenceAddr}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <label htmlFor="">Married In Church</label>
                  <div className="wed_in">
                    <label htmlFor="wedded-yes">
                      <input
                        type="radio"
                        name="wedded"
                        value="YES"
                        id="wedded-yes"
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            wedded: e.target.value,
                          }))
                        }
                        required
                      />
                      YES
                    </label>
                    <label htmlFor="wedded-no">
                      <input
                        type="radio"
                        name="wedded"
                        value="NO"
                        id="wedded-no"
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            wedded: e.target.value,
                          }))
                        }
                        required
                      />
                      NO
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div>
                    <label htmlFor="sponsor">Name Of Child's Sponsor </label>
                    <input
                      type="text"
                      name="sponsor"
                      id="sponsor"
                      placeholder="*Sponsor must be a confirmed catholic"
                      onChange={handleChange}
                      value={formData.sponsor}
                      required
                    />
                  </div>
                </div>
                <button>Proceed To Make Payment</button>
              </form>
            </div>
          </section>
        </main>
      </>
    );
  }
};

export default Baptism;
