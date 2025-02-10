import PopUp from "../../../components/common/Popup/Popup";
import axiosInstance from "../../../components/Utils/axiosInstance";

import "./Records.scss";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/common/Loader/Loader";
import usePageLoad from "../../../components/Utils/usePageLoad";

const Records = () => {
  const [desiredType, setDesiredType] = useState("baptism");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Creating a state Object for form data
    baptismName: "",
    otherName: "",
    surname: "",
    dob: "",
    birthPlace: "",
    fatherName: "",
    motherName: "",
    homeTown: "",
    lga: "",
    state: "",
    doBaptism: "",
    sponsor: "",
    minister: "",
    lb: "",
  });

  const [formDataMarriage, setFormDataMarriage] = useState({
    husbandName: "",
    wifeName: "",
    doMarriage: null,
    lm: null,
    witness1: "",
    witness2: "",
    officiatingPriest: "",
  });

  const [message, setMessage] = useState({ status: "", message: "" });

  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();

  // Handling Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const resetFormData = () => {
    setFormDataMarriage({
      husbandName: "",
      wifeName: "",
      doMarriage: null,
      lm: null,
      witness1: "",
      witness2: "",
      officiatingPriest: "",
    });
    setFormData({
      // Creating a state Object for form data
      baptismName: "",
      otherName: "",
      surname: "",
      dob: "",
      birthPlace: "",
      fatherName: "",
      motherName: "",
      homeTown: "",
      lga: "",
      state: "",
      doBaptism: "",
      sponsor: "",
      minister: "",
      lb: "",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    try {
      const userRole = jwtDecode(token).role;
      if (!(userRole === "superAdmin" || userRole === "secretary")) {
        return navigate("/admin/articles");
      }
      setLoading(false);
    } catch (error) {
      return navigate("/admin/articles");
    }
  }, []);

  const handleCancel = () => {
    setMessage((prevState) => ({ ...prevState, message: "" }));
    setShowPopup(false);
  };

  // Handling Input Change when typing
  const handleChange = (e) => {
    // Handle input changes dynamically
    const { name, value } = e.target;

    switch (desiredType) {
      case "baptism":
        setFormData((prevData) => ({
          ...prevData,
          [name]: value, // Update only the field that changed
        }));
        break;
      case "marriage":
        setFormDataMarriage((prevData) => ({
          ...prevData,
          [name]: value, // Update only the field that changed
        }));
        break;
      default:
        break;
    }
  };

  const handleType = (e) => {
    const { id } = e.target;
    setDesiredType((prevType) => id);
    resetFormData();
  };

  const handleMultiple = () => {
    resetFormData();
    setMultiple((prevState) => !prevState);
  };

  const handleProceed = async () => {
    try {
      setMessage({ status: "", message: "" });

      const interest = multiple ? "multiple" : desiredType;

      switch (interest) {
        case "multiple":
          setIsLoading(true);

          const bulkPayload = new FormData();
          bulkPayload.set("file", file);
          bulkPayload.set("for", desiredType);

          const bulkres = await axiosInstance.post(
            "/records/bulk-upload",
            bulkPayload,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          const bulkresData = bulkres.data;

          setMessage({
            status: bulkresData?.status || "success",
            message: bulkresData?.message || "Record saved successfully!",
          });
          setIsLoading(false);
          setShowPopup(false);

          setTimeout(() => {
            setMessage({ status: "", message: "" });
          }, 2000);
          break;

        case "baptism":
          setIsLoading(true);
          const payload = formData;

          const response = await axiosInstance.post(
            "/records/baptism",
            payload
          );

          const { data } = response.data;
          setMessage({
            status: data?.status || "success",
            message: data?.message || "Record saved successfully!",
          });
          setIsLoading(false);
          setShowPopup(false);

          setTimeout(() => {
            setMessage({ status: "", message: "" });
          }, 2000);
          break;

        case "marriage":
          setIsLoading(true);
          const payloadMarriage = formDataMarriage;

          const res = await axiosInstance.post(
            "/records/marriage",
            payloadMarriage
          );

          const { resData } = res.data;
          setMessage({
            status: resData?.status || "success",
            message: resData?.message || "Record saved successfully!",
          });
          setIsLoading(false);
          setShowPopup(false);

          setTimeout(() => {
            setMessage({ status: "", message: "" });
          }, 2000);
          break;

        default:
          setMessage({
            status: "failure",
            message: "Could not understand Choice... ):",
          });
          break;
      }
    } catch (error) {
      setIsLoading(false);
      setShowPopup(false);

      const customMessage =
        error?.response?.data?.message && error?.response?.data?.message;
      error.message =
        customMessage || "🛑 oops! Something went wrong while saving data.";
      setMessage({
        status: "failure",
        message: error?.message,
      });
      setTimeout(() => {
        setMessage({ status: "", message: "" });
      }, 10000);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      selectedFile?.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
    } else {
      setMessage({
        status: "failure",
        message: "Please upload a valid Excel file (.xlsx)",
      });
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      e.target.value = ""; // Reset the file input
    }
  };

  {
    return !isPageLoaded || loading ? (
      <div className="load">
        <Loader />
      </div>
    ) : (
      <>
        <main className="main_records">
          <PopUp
            showPopup={showPopup}
            handleCancel={handleCancel}
            handleProceed={handleProceed}
            isLoading={isLoading}
            message={message?.message || ""}
          />
          <section className="records form-section">
            {desiredType === "baptism" && formData?.lb && (
              <p className="lb-no">{"#" + formData.lb}</p>
            )}
            {desiredType === "marriage" && formDataMarriage?.lm && (
              <p className="lm-no">{"#" + formDataMarriage.lm}</p>
            )}
            <div className="wrap">
              <div className="form-header">
                <h2>CREATE NEW RECORD</h2>
              </div>

              <div className="record-type">
                <div
                  className={
                    desiredType === "marriage"
                      ? "marriage-record active"
                      : "marriage-record"
                  }
                  id="marriage"
                  onClick={handleType}
                >
                  Marriage
                </div>
                <div
                  className={
                    desiredType === "baptism"
                      ? "baptism-record active"
                      : "baptism-record"
                  }
                  id="baptism"
                  onClick={handleType}
                >
                  Baptism
                </div>

                <div
                  className={
                    multiple ? "multiple-record active" : "multiple-record"
                  }
                  id="multiple"
                  onClick={handleMultiple}
                >
                  Upload Multiple (excel file)
                </div>
              </div>

              {multiple ? (
                <form action="" onSubmit={handleSubmit}>
                  <div className="row">
                    <label>Upload Multiple {desiredType} Records </label>
                    <input
                      type="file"
                      accept=".xlsx" // Restricts selection to .xlsx files
                      onChange={handleFileChange}
                      required
                    />
                  </div>

                  <button>Uplaod Records</button>

                  <div className="feedback">
                    {message?.message && (
                      <p
                        className={
                          message?.status ? `msg ${message.status}` : `msg hide`
                        }
                      >
                        {message?.message}
                      </p>
                    )}
                  </div>
                </form>
              ) : desiredType === "baptism" ? (
                <form action="" onSubmit={handleSubmit}>
                  <div className="row input-grp">
                    <div>
                      <label htmlFor="Baptism_name">
                        Child's Baptismal Name
                      </label>
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
                  <div className="row input-grp">
                    <div>
                      <label htmlFor="dob-baptism">Date Of Baptism</label>
                      <input
                        type="date"
                        name="doBaptism"
                        id="dob-baptism"
                        onChange={handleChange}
                        value={formData.doBaptism}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="placeofBaptism">Place of Baptism</label>
                      <input
                        type="text"
                        name="placeofBaptism"
                        id="place_of_baptism"
                        readOnly
                        value={
                          "St. Matthias Catholic Church Amarata, Yenagoa Bayelsa state."
                        }
                      />
                    </div>
                  </div>

                  <div className="row input-grp" id="uniq">
                    <div>
                      <label htmlFor="sponsor">
                        Name Of Child's Sponsor(s){" "}
                      </label>
                      <input
                        type="text"
                        name="sponsor"
                        id="sponsor"
                        placeholder="E.g Sponsor 1 , sponsor 2"
                        onChange={handleChange}
                        value={formData.sponsor}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="LB">LB NO.</label>
                      <input
                        type="number"
                        name="lb"
                        id="LB"
                        min={1}
                        onChange={handleChange}
                        value={formData.lb}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="minister">Minister</label>
                    <input
                      type="text"
                      id="minister"
                      name="minister"
                      onChange={handleChange}
                      value={formData.minister}
                      placeholder="E.g Rev. Fr. Bruno Douglas Ogomu"
                      required
                    />
                  </div>
                  <button>Proceed To Save Record</button>
                  <div className="feedback">
                    {desiredType === "baptism" && message?.message && (
                      <p
                        className={
                          message?.status ? `msg ${message.status}` : `msg hide`
                        }
                      >
                        {message?.message}
                      </p>
                    )}
                  </div>
                </form>
              ) : (
                <form action="" onSubmit={handleSubmit}>
                  <div className="row input-grp">
                    <div>
                      <label htmlFor="sponsus">Husband's FullName</label>
                      <input
                        type="text"
                        id="sponsus"
                        name="husbandName"
                        onChange={handleChange}
                        value={formDataMarriage?.husbandName || ""}
                        placeholder="E.g Paul Ebiyeme"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="sponsa">Wife's FullName</label>
                      <input
                        type="text"
                        id="sponsa"
                        name="wifeName"
                        onChange={handleChange}
                        value={formDataMarriage?.wifeName || ""}
                        placeholder="E.g Blessing Godwin"
                        required
                      />
                    </div>
                  </div>
                  <div className="row input-grp" id="uniq">
                    <div>
                      <label htmlFor="doMarriage">Date of Marraige</label>
                      <input
                        type="date"
                        id="doMarriage"
                        name="doMarriage"
                        value={formDataMarriage?.doMarriage || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lm">LM NO.</label>
                      <input
                        type="number"
                        min={1}
                        id="lm"
                        name="lm"
                        value={formDataMarriage?.lm || ""}
                        onChange={handleChange}
                        placeholder="E.g 1245"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="place">Place of Marriage</label>
                    <input
                      type="text"
                      id="place"
                      value={
                        "St. Matthias Catholic Church Amarata, Yenagoa Bayelsa state."
                      }
                      readOnly
                    />
                  </div>

                  <div className="row input-grp">
                    <div>
                      <label htmlFor="witness-1">Witness 1</label>
                      <input
                        type="text"
                        id="witness-1"
                        name="witness1"
                        onChange={handleChange}
                        value={formDataMarriage?.witness1 || ""}
                        placeholder="Enter name of Witness1 "
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="Witness-2">Witness 2</label>
                      <input
                        type="text"
                        id="witness-2"
                        name="witness2"
                        onChange={handleChange}
                        value={formDataMarriage?.witness2 || ""}
                        placeholder="Enter name of Witness2 "
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <label htmlFor="officiatingPriest">
                      officiating Priest
                    </label>
                    <input
                      type="text"
                      id="officiatingPriest"
                      name="officiatingPriest"
                      onChange={handleChange}
                      value={formDataMarriage?.officiatingPriest || ""}
                      placeholder="E.g Rev. Fr. Bruno Douglas Ogomu"
                      required
                    />
                  </div>

                  <button>Proceed to Save Record</button>
                  <div className="feedback">
                    {desiredType === "marriage" && message?.message && (
                      <p
                        className={
                          message?.status ? `msg ${message.status}` : `msg hide`
                        }
                      >
                        {message?.message}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </section>
        </main>
      </>
    );
  }
};

export default Records;
