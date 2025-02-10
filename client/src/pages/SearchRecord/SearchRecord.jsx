import { useState } from "react";
import "./SearchRecord.scss";
import axiosInstance from "../../components/Utils/axiosInstance";
import Table from "../../components/common/Table/Table";
import formatDate from "../../components/Utils/formatDate";
import Pagination from "../../components/common/Pagination/Pagination";
import Loader from "../../components/common/Loader/Loader";
import usePageLoad from "../../components/Utils/usePageLoad";

const SearchRecord = () => {
  const [desiredType, setDesiredType] = useState("baptism");
  const [id, setId] = useState(null);
  const [searchDate, setSearchDate] = useState({ to: null, from: null });
  const [isData, setIsData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handling Page Loading Spinner
  const isPageLoaded = usePageLoad();

  //   Variables for table
  const [cols, setCols] = useState(null);
  const [rows, setRows] = useState(null);

  // Setting up for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Logic For Page Changes
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleType = (e) => {
    const { id } = e.target;
    setDesiredType(id);
    resetFormData();
  };
  const [searchBy, setSearchBy] = useState("name");

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

  const resetFormData = () => {
    setIsData(null);
    setId(null);
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { name } = e.target;
      setLoading(true);
      switch (name) {
        case "byid":
          const responseFromId = await axiosInstance.get(
            `/records/searchbyid`,
            {
              params: {
                [desiredType === "marriage" ? "lm" : "lb"]: id,
                desiredType,
              },
            }
          );
          const dataById = responseFromId.data;
          dataById.foundRecord === null ? setIsData(false) : setIsData(true);

          if (setIsData) {
            if (desiredType === "marriage") {
              setCols([
                "Husband's Name",
                "Wife's Name",
                "Date Of Marriage",
                "Witness 1",
                "Witness 2",
                "Officiating Priest",
              ]);
              setRows([
                [
                  dataById?.foundRecord?.husbandName,
                  dataById?.foundRecord?.wifeName,
                  formatDate(dataById?.foundRecord?.doMarriage),
                  dataById?.foundRecord?.witness1,
                  dataById?.foundRecord?.witness2,
                  dataById?.foundRecord?.officiatingPriest,
                ],
              ]);
            } else if (desiredType === "baptism") {
              setCols([
                "Baptismal Name",
                "Other Name ",
                "Surname",
                "Date Of Baptism",
                "Date Of Birth",
                "Father's Name",
                "Mother's Name",
                "Sponsor",
                "Minister",
              ]);
              setRows([
                [
                  dataById?.foundRecord?.baptismName,
                  dataById?.foundRecord?.otherName,
                  dataById?.foundRecord?.surname,
                  formatDate(dataById?.foundRecord?.doBaptism),
                  formatDate(dataById?.foundRecord?.dob),
                  dataById?.foundRecord?.fatherName,
                  dataById?.foundRecord?.motherName,
                  dataById?.foundRecord?.sponsor,
                  dataById?.foundRecord?.minister,
                ],
              ]);
            }
          }

          break;
        case "searchbyyear":
          const responseFromDate = await axiosInstance.get(
            "/records/searchbydate",
            {
              params: {
                to: searchDate.to,
                from: searchDate.from,
                desiredType,
                page: currentPage,
                limit: 10,
              },
            }
          );

          setLoading(false);
          const {
            foundRecords: dataByDate,
            currentPage: currPage,
            totalPages,
          } = responseFromDate.data;
          setCurrentPage(currPage);
          setTotalPages(totalPages);

          dataByDate?.length === 0 ? setIsData(false) : setIsData(true);

          if (setIsData) {
            if (desiredType === "marriage") {
              setCols([
                "Husband's Name",
                "Wife's Name",
                "Date Of Marriage",
                "Witness 1",
                "Witness 2",
                "Officiating Priest",
              ]);
              setRows(
                dataByDate.map((data) => [
                  data.husbandName,
                  data.wifeName,
                  formatDate(data.doMarriage),
                  data.witness1,
                  data.witness2,
                  data.officiatingPriest,
                ])
              );
            } else if (desiredType === "baptism") {
              setCols([
                "Baptismal Name",
                "Other Name ",
                "Surname",
                "Date Of Baptism",
                "Date Of Birth",
                "Father's Name",
                "Mother's Name",
                "Sponsor",
                "Minister",
              ]);
              setRows(
                dataByDate.map((data) => [
                  data.baptismName,
                  data.otherName,
                  data.surname,
                  formatDate(data.doBaptism),
                  formatDate(data.dob),
                  data.fatherName,
                  data.motherName,
                  data.sponsor,
                  data.minister,
                ])
              );
            }
          }
          break;
        case "searchbyname":
          const payload = {};

          if (desiredType === "marriage") {
            payload.husbandName = formDataMarriage.husbandName.trim();
            payload.wifeName = formDataMarriage.wifeName.trim();
          } else if (desiredType === "baptism") {
            payload.baptismName = formData.baptismName.trim();
            payload.otherName = formData.otherName.trim();
            payload.surname = formData.surname.trim();
          }

          const responseFromName = await axiosInstance.get(
            "/records/searchbyname",
            {
              params: { ...payload, desiredType, page: currentPage, limit: 10 },
            }
          );

          setLoading(false);

          const {
            foundRecords: dataByName,
            currentPage: currPageName,
            totalPages: totalPagesName,
          } = responseFromName.data;
          setCurrentPage(currPageName);
          setTotalPages(totalPagesName);

          dataByName.length === 0 ? setIsData(false) : setIsData(true);
          if (setIsData) {
            if (desiredType === "marriage") {
              setCols([
                "Husband's Name",
                "Wife's Name",
                "Date Of Marriage",
                "Witness 1",
                "Witness 2",
                "Officiating Priest",
              ]);
              setRows(
                dataByName.map((data) => [
                  data.husbandName,
                  data.wifeName,
                  formatDate(data.doMarriage),
                  data.witness1,
                  data.witness2,
                  data.officiatingPriest,
                ])
              );
            } else if (desiredType === "baptism") {
              setCols([
                "Baptismal Name",
                "Other Name ",
                "Surname",
                "Date Of Baptism",
                "Date Of Birth",
                "Father's Name",
                "Mother's Name",
                "Sponsor",
                "Minister",
              ]);
              setRows(
                dataByName.map((data) => [
                  data.baptismName,
                  data.otherName,
                  data.surname,
                  formatDate(data.doBaptism),
                  formatDate(data.dob),
                  data.fatherName,
                  data.motherName,
                  data.sponsor,
                  data.minister,
                ])
              );
            }
          }
          break;
        default:
          setLoading(false);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  {
    return !isPageLoaded || loading ? (
      <Loader />
    ) : (
      <>
        <section className="search_section">
          <section className="top article">
            <div className="overlay"></div>
            <div className="text">
              <h1>Search Our Archive</h1>
            </div>
          </section>
          <main className="main_records search">
            <section className="records form-section">
              <div className="wrap">
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

                  <div className="search_by">
                    <div
                      onClick={() => {
                        resetFormData();
                        return setSearchBy("id");
                      }}
                      className={searchBy === "id" ? "term activeterm" : "term"}
                    >
                      search by # ID
                    </div>
                    <div
                      onClick={() => {
                        resetFormData();
                        return setSearchBy("name");
                      }}
                      className={
                        searchBy === "name" ? "term activeterm" : "term"
                      }
                    >
                      search by Name
                    </div>
                    <div
                      onClick={() => {
                        resetFormData();
                        return setSearchBy("year");
                      }}
                      className={
                        searchBy === "year" ? "term activeterm" : "term"
                      }
                    >
                      search by Date
                    </div>
                  </div>
                </div>

                {searchBy === "year" && (
                  <form name="searchbyyear" onSubmit={handleSubmit}>
                    <div className="row input-grp">
                      <div>
                        <label htmlFor="YearFrom">
                          Search {desiredType} Record From
                        </label>
                        <input
                          type="date"
                          onChange={(e) =>
                            setSearchDate((prev) => ({
                              ...prev,
                              from: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="YearTo">
                          Search {desiredType} Record To
                        </label>
                        <input
                          type="date"
                          onChange={(e) =>
                            setSearchDate((prev) => ({
                              ...prev,
                              to: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                    </div>

                    <button>Search By Year</button>
                  </form>
                )}
                {searchBy === "name" ? (
                  desiredType === "baptism" ? (
                    <form name="searchbyname" onSubmit={handleSubmit}>
                      <div className="row input-grp">
                        <div>
                          <label htmlFor="Baptism_name">
                            Candidates's Baptismal Name
                          </label>
                          <input
                            type="text"
                            name="baptismName"
                            id="Baptism_name"
                            placeholder="Baptismal Name"
                            onChange={handleChange}
                            value={formData.baptismName || ""}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="Other_name">
                            Candidates's Other Name
                          </label>
                          <input
                            type="text"
                            name="otherName"
                            id="Other_name"
                            placeholder="Other Name"
                            onChange={handleChange}
                            value={formData.otherName || ""}
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
                            value={formData.surname || ""}
                            required
                          />
                        </div>
                      </div>

                      <button>Search Archive</button>
                    </form>
                  ) : (
                    desiredType === "marriage" && (
                      <form name="searchbyname" onSubmit={handleSubmit}>
                        <div className="row input-grp">
                          <div>
                            <label htmlFor="husband_name">Husband's Name</label>
                            <input
                              type="text"
                              name="husbandName"
                              id="husband_name"
                              placeholder="Husband's Name"
                              onChange={handleChange}
                              value={formDataMarriage.husbandName || ""}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="wife_name">Wife's Name</label>
                            <input
                              type="text"
                              name="wifeName"
                              id="wife_name"
                              placeholder="Wife's Name"
                              onChange={handleChange}
                              value={formDataMarriage.wifeName || ""}
                              required
                            />
                          </div>
                        </div>

                        <button>Search Archive</button>
                      </form>
                    )
                  )
                ) : (
                  searchBy === "id" && (
                    <form onSubmit={handleSubmit} name="byid">
                      <label htmlFor="id">
                        {desiredType === "marriage"
                          ? "Enter LM-Number"
                          : "Enter LB-Number"}
                      </label>
                      <div className="row">
                        <input
                          type="number"
                          name="id"
                          id="id"
                          min={1}
                          onChange={(e) => setId(e.target.value)}
                          value={id || ""}
                          required
                        />
                      </div>
                      <button>Search Archive</button>
                    </form>
                  )
                )}
              </div>
              {isData === false ? (
                <div className="no_records">
                  <h2>No Records Found..</h2>
                </div>
              ) : (
                isData && (
                  <>
                    <div className="archive_result">
                      <h2>Found {desiredType} Record(s)</h2>
                      <Table colsHeadr={cols} rows={rows} />
                    </div>
                    {searchBy !== "id" && (
                      <div className="footer-pagination">
                        <Pagination
                          handlePageChange={handlePageChange}
                          currentPage={currentPage}
                          totalPages={totalPages}
                        />
                      </div>
                    )}
                  </>
                )
              )}
            </section>
          </main>
        </section>
      </>
    );
  }
};

export default SearchRecord;
