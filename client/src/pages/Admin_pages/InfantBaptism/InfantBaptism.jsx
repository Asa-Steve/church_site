import { useEffect, useState } from "react";
import "./InfantBaptism.scss";
import axiosInstance from "../../../components/Utils/axiosInstance";
import Pagination from "../../../components/common/Pagination/Pagination";
import Loader from "../../../components/common/Loader/Loader";

const MassRequest = () => {
  // const [registrations, setRegistrations] = useState([
  //   {
  //     _id: crypto.randomUUID(),
  //     baptismName: "Stephen",
  //     otherName: "Okechukwu",
  //     surname: "Asadu",
  //     DOB: "1999/09/22",
  //     placeOfBirth: "Grimard Hospital, Anyigba Kogi State",
  //     father: "Asadu Joseph Odoh",
  //     mother: "Asadu Lorretta",
  //     phoneNo: "08064503240,08068290518",
  //     homeTown: "Amebo Ejuona",
  //     lga: "Nsukka",
  //     state: "Enugu",
  //     residencialAdd:
  //       "Behind former Gov. Ibro's House , Abuja area , Anyigba Kogi state",
  //     married: "Yes",
  //     sponsor: "Celestine Asogwa",
  //   },
  //   {
  //     _id: crypto.randomUUID(),
  //     baptismName: "Stephen",
  //     otherName: "Okechukwu",
  //     surname: "Asadu",
  //     DOB: "1999/09/22",
  //     placeOfBirth: "Grimard Hospital, Anyigba Kogi State",
  //     father: "Asadu Joseph Odoh",
  //     mother: "Asadu Lorretta",
  //     phoneNo: "08064503240,08068290518",
  //     homeTown: "Amebo Ejuona",
  //     lga: "Nsukka",
  //     state: "Enugu",
  //     residencialAdd:
  //       "Behind former Gov. Ibro's House , Abuja area , Anyigba Kogi state",
  //     married: "Yes",
  //     sponsor: "Celestine Asogwa",
  //   },
  //   {
  //     _id: crypto.randomUUID(),
  //     baptismName: "Stephen",
  //     otherName: "Okechukwu",
  //     surname: "Asadu",
  //     DOB: "1999/09/22",
  //     placeOfBirth: "Grimard Hospital, Anyigba Kogi State",
  //     father: "Asadu Joseph Odoh",
  //     mother: "Asadu Lorretta",
  //     phoneNo: "08064503240,08068290518",
  //     homeTown: "Amebo Ejuona",
  //     lga: "Nsukka",
  //     state: "Enugu",
  //     residencialAdd:
  //       "Behind former Gov. Ibro's House , Abuja area , Anyigba Kogi state",
  //     married: "Yes",
  //     sponsor: "Celestine Asogwa",
  //   },
  //   {
  //     _id: crypto.randomUUID(),
  //     baptismName: "Immaculate ",
  //     otherName: "Perekibo",
  //     surname: "Kikileyi",
  //     DOB: "1999/09/22",
  //     placeOfBirth:
  //       "Grimard Hospital, Anyigba Kogi State,  Grimard Hospital, Anyigba Kogi State",
  //     father: "Asadu Joseph Odoh",
  //     mother: "Asadu Lorretta",
  //     phoneNo: "08064503240,08068290518",
  //     homeTown: "Amebo Ejuona",
  //     lga: "Nsukka",
  //     state: "Enugu",
  //     residencialAdd:
  //       "Behind former Gov. Ibro's House , Abuja area , Anyigba Kogi state",
  //     married: "Yes",
  //     sponsor: "Celestine Asogwa",
  //   },
  // ]);

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getRequests = async (page) => {
    try {
      setMessage("");
      setLoading(true);
      const response = await axiosInstance.get(`/infants?page=${page}&limit=4`);
      setRegistrations(response?.data?.data);
      setTotalPages(response?.data.totalPages);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage("Couldn't get Requests at the moment try again later");
    }
  };

  const handlePageChange = async (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getRequests(currentPage);
  }, [currentPage]);

  {
    return loading ? (
      <div className="load">
        <Loader />
      </div>
    ) : !loading && registrations?.length < 1 ? (
      <div className="msg admin">
        <h1>{message ? message : "No Registrations Found."}</h1>
      </div>
    ) : (
      <div className="registrations">
        <div className="infants">
          {registrations.map(
            ({ email, parents, sponsor, infant, createdAt }) => (
              <div className="infant" key={infant._id}>
                <h3>
                  <span>Baptismal Name : </span>
                  {infant.baptismName}
                </h3>
                <div className="infant-body">
                  <p>
                    <span>Other Name :</span>
                    {infant.otherName}
                  </p>
                  <p>
                    <span>Surname :</span>
                    {infant.surname}
                  </p>
                  <p>
                    <span>D.O.B :</span>{" "}
                    {new Date(infant.dob).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  <p>
                    <span>father :</span> {parents.fatherName}
                  </p>
                  <p>
                    <span>mother :</span> {parents.motherName}
                  </p>
                  <p>
                    <span>Home Town :</span> {parents.homeTown}
                  </p>
                  <p>
                    <span>phone :</span>
                    {parents.contact.split(",").join(" or ")}
                  </p>

                  <p>
                    <span>LGA :</span> {parents.lga}
                  </p>
                  <p>
                    <span>State :</span> {parents.state}
                  </p>
                  <p>
                    <span>married in Church :</span> {parents.wedded}
                  </p>
                  <p>
                    <span>Sponsor :</span> {sponsor}
                  </p>

                  <p>
                    <span>Registered on :</span>
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <span>Email : </span>
                    {email}
                  </p>
                  <p>
                    <span>place Of Birth :</span> {infant.birthPlace}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        <div className="request-footer">
          <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    );
  }
};

export default MassRequest;
