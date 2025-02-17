import PopUp from "../../../components/common/Popup/Popup";
import axiosInstance from "../../../components/Utils/axiosInstance";

import "./Records.scss";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/common/Loader/Loader";
import usePageLoad from "../../../components/Utils/usePageLoad";
import BaptismForm from "../../../components/common/BaptismForm/BaptismForm";
import MarriageForm from "../../../components/common/MarriageForm/MarriageForm";

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

    setIsLoading(false);
    setShowPopup(false);
    setTimeout(() => {
      setMessage({ status: "", message: "" });
      navigate("/admin/records");
    }, 2000);
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

          break;

        default:
          setMessage({
            status: "failure",
            message: "Could not understand Choice... ):",
          });
          break;
      }

      resetFormData();
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
                <BaptismForm
                  handleSubmit={handleSubmit}
                  candidate={formData}
                  message={message}
                  handleChange={handleChange}
                />
              ) : (
                <MarriageForm
                  handleSubmit={handleSubmit}
                  candidate={formDataMarriage}
                  message={message}
                  handleChange={handleChange}
                />
              )}
            </div>
          </section>
        </main>
      </>
    );
  }
};

export default Records;
