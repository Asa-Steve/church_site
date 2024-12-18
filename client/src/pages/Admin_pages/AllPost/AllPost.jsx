import { useEffect, useState } from "react";
import axiosInstance from "../../../components/Utils/axiosInstance";
import "./AllPost.scss";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../components/common/Pagination/Pagination";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = async (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPosts = async (page) => {
    try {
      setMessage("");
      const response = await axiosInstance.get(`/posts?page=${page}&limit=4`);
      setPosts(response?.data?.data);
      setTotalPages(response?.data?.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage("Couldn't get post at the moment try again later");
    }
  };

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  const handleDelete = async (articleSlug) => {
    try {
      await axiosInstance.delete(`/posts/${articleSlug}`);
      navigate("/articles");
    } catch (error) {
      console.log("error", error?.message);
    }
  };
  {
    return posts.length < 1 ? (
      <div className="msg admin">
        <h1>{message ? message : "No Post Found."}</h1>
      </div>
    ) : (
      <>
        <h1 className="all_postheader">All Posts</h1>
        <div>
          <div className="admin_posts">
            {posts.map((post) => {
              return (
                <div key={post._id} className="post">
                  <div className="post-img">
                    <img src={`${post.file}`} alt={post.postTitle} />
                  </div>
                  <div className="post-body">
                    <h2>
                      <Link to={`/articles/${post.slug}`}>
                        {post?.postTitle}
                      </Link>
                    </h2>
                    <div className="post-footer">
                      <div className="author-deit">
                        <p>Tag : {post?.category}</p>
                        <p className="author">
                          posted by : {post?.author?.username}
                        </p>
                      </div>
                      <div className="btns">
                        <Link to={`/admin/article/edit/${post.slug}`}>
                          Edit
                        </Link>
                        <button onClick={() => handleDelete(post.slug)}>
                          Delete
                        </button>
                      </div>
                    </div>
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
      </>
    );
  }
};

export default AllPost;
