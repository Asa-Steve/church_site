import { useEffect, useState } from "react";
import axiosInstance from "../../../components/Utils/axiosInstance";
import "./AllUsers.scss";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../components/common/Pagination/Pagination";
import Loader from "../../../components/common/Loader/Loader";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Handling Page Change [pagination]
  const handlePageChange = async (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Logic for Getting all users from server
  const getUsers = async (page) => {
    try {
      setMessage("");
      const response = await axiosInstance.get(`/users?page=${page}&limit=8`); // sending Queries alongside
      setUsers(response?.data?.data);
      setTotalPages(response?.data?.totalPages);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.status === 403)
        err.message = "Youre Not Authorized to view this page.";
      setMessage(err?.message || "No User Found");
    }
  };

  // Getting all User from Server with respect to Page [Pagination]
  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  // Handling Delete
  const handleDelete = async (articleSlug) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/users/${articleSlug}`);
      getUsers();
    } catch (err) {
      setLoading(false);
      console.log("error", err?.message || "something went wrong");
    }
  };
  {
    return loading ? (
      <div className="load">
        <Loader />
      </div>
    ) : !loading && users.length < 1 ? (
      <div className="msg admin">
        <h1>{message ? message : "No User Found."}</h1>
      </div>
    ) : (
      <div>
        <h1 className="all_postheader">All Users</h1>
        <div>
          <div className="admin_allusers">
            {users.map((user) => {
              return (
                <div key={user._id} className="user">
                  <div className="user-img">
                    <img
                      src={user.img ? `${user.img}` : "/profile.webp"}
                      alt={user.username}
                    />
                  </div>
                  <h2>{user.username}</h2>
                  <p>
                    {" "}
                    joined:
                    {` ${new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}
                  </p>
                  <p className="role">{user.role}</p>
                  <div className="btns">
                    <Link to={`/admin/users/edit/${user._id}`}>Edit</Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="footer-pagination">
            <Pagination
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default AllUsers;
