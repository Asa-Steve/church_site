import { useEffect, useState } from "react";
import "./MassRequest.scss";
import axiosInstance from "../../../components/Utils/axiosInstance";
import Pagination from "../../../components/common/Pagination/Pagination";
import Loader from "../../../components/common/Loader/Loader";

const MassRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getRequests = async (page) => {
    try {
      setMessage("");
      setLoading(true);
      const response = await axiosInstance.get(
        `/requests?page=${page}&limit=4`
      );
      setRequests(response?.data?.data);
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
    ) : !loading && requests.length < 1 ? (
      <div className="msg admin">
        <h1>{message ? message : "No Request Found."}</h1>
      </div>
    ) : (
      <div className="all-request">
        <div className="requests">
          {requests.map((request) => (
            <div className="request" key={request._id}>
              <div className="requested-header">
                <div className="req-by">
                  <span>Requested By:</span>
                  <h3>{request.fullName}</h3>
                </div>
                <div className="extras">
                  <strong>
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(request.amount)}
                  </strong>
                  <p>
                    {new Date(request.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="request-body">
                <div className="novena">
                  <span>Novena:</span>
                  <p>{request.novena} days novena</p>
                </div>
                <div className="intention">
                  <span>Intention:</span>
                  <p>{request.intentions}</p>
                </div>
                <div className="note">
                  <span>Requested For:</span>

                  <p>{request.requestedFor}</p>
                </div>
                <div className="note">
                  <span>Note:</span>

                  <p>{request.note}</p>
                </div>
              </div>
            </div>
          ))}
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
