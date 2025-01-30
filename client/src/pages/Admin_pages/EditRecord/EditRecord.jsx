import axiosInstance from "../../../components/Utils/axiosInstance";

import "./EditRecord.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BaptismForm from "../../../components/common/BaptismForm/BaptismForm";
import PopUp from "../../../components/common/Popup/Popup";
import MarriageForm from "../../../components/common/MarriageForm/MarriageForm";
import Loader from "../../../components/common/Loader/Loader";

const EditRecords = () => {
  const { recordId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [feedBack, setFeedBack] = useState(null);
  const [desiredType, setDesiredType] = useState(null);

  const [showPopup, setShowPopup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    baptism: {
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
    },
    marriage: {
      husbandName: "",
      wifeName: "",
      doMarriage: null,
      lm: null,
      witness1: "",
      witness2: "",
      officiatingPriest: "",
    },
  });

  const handleCancel = () => {};
  const handleProceed = async () => {
    console.log(formData);
    const payload = { ...formData[desiredType] };

    console.log(payload);

    try {
      const response = await axiosInstance.put(`/records`, payload, {
        params: {
          desiredType,
          [desiredType === "baptism" ? "lb" : "lm"]: recordId,
        },
      });

      const { data } = response;
      setFeedBack(data);
    } catch (error) {
      if (error?.response) {
        error.message =
          error?.response?.data?.message || "Oops! something went wrong";
      }
      setFeedBack({ status: "failure", message: error.message });
    }
    setTimeout(() => {
      setFeedBack(null);
    }, 3000);
  };

  useEffect(() => {
    if (searchParams.get("lb") === "true") {
      setDesiredType("baptism");
    } else if (searchParams.get("lb") === "false") {
      setDesiredType("marriage");
    } else {
      setDesiredType(null);
      setIsLoading(false);

      return setMessage({
        status: "failure",
        message: "Invalid Search Term",
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (!desiredType) return; // Prevent API call if desiredType is not yet set

    const getRecord = async () => {
      setIsLoading(true);
      try {
        if (recordId) {
          // Fetch Baptism Record
          const response = await axiosInstance.get(`/records/searchbyid`, {
            params: {
              [desiredType === "marriage" ? "lm" : "lb"]: recordId,
              desiredType,
            },
          });

          const { foundRecord } = response.data;
          if (!foundRecord) {
            setMessage({
              status: "failure",
              message: "No Record Found",
            });
          }
          setFormData((prev) => ({
            ...prev,
            [desiredType]: {
              ...foundRecord,
              dob: foundRecord?.dob
                ? new Date(foundRecord.dob).toISOString().split("T")[0]
                : "",
              doBaptism: foundRecord?.doBaptism
                ? new Date(foundRecord.doBaptism).toISOString().split("T")[0]
                : "",
              doMarriage: foundRecord?.doMarriage
                ? new Date(foundRecord.doMarriage).toISOString().split("T")[0]
                : "",
            }, // Spread previous & merge new data
          }));
        }
      } catch (error) {
        setMessage({
          status: "failure",
          message: "Couldn't get Record.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getRecord();
  }, [desiredType, recordId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleProceed();
  };

  // Handling Input Change when typing
  const handleChange = (e) => {
    // Handle input changes dynamically
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [desiredType]: { ...prevData[desiredType], [name]: value }, // Update only the field that changed
    }));
  };

  {
    return isLoading ? (
      <Loader />
    ) : message?.status ? (
      <div className="admin msg">
        <h1>{message.message}</h1>
      </div>
    ) : (
      <main className="main_records">
        <PopUp
          showPopup={showPopup}
          handleCancel={handleCancel}
          handleProceed={handleProceed}
          isLoading={isLoading}
          message={message?.message || ""}
        />
        <section className="records form-section">
          <div className="wrap">
            <div className="form-header">
              <h2>EDIT {desiredType?.toUpperCase()} RECORD </h2>
              {desiredType === "baptism" ? (
                <BaptismForm
                  handleSubmit={handleSubmit}
                  candidate={formData["baptism"]}
                  message={feedBack}
                  handleChange={handleChange}
                />
              ) : (
                <MarriageForm
                  handleSubmit={handleSubmit}
                  candidate={formData["marriage"]}
                  message={feedBack}
                  handleChange={handleChange}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default EditRecords;
