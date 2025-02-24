import { Link } from "react-router-dom";
import "./Articles.scss";
import axiosInstance from "../../components/Utils/axiosInstance";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader/Loader";
import Pagination from "../../components/common/Pagination/Pagination";

const Articles = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Setting up for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Logic For Page Changes
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Fetching All Posts
  const getPosts = async (page) => {
    try {
      setMessage("");
      setLoading(true);

      const response = await axiosInstance.get(
        `/posts?page=${page}&limit=10` //Making a request with page no, limits and userId if logged in
      );

      setPosts(response?.data?.data);
      setTotalPages(response?.data?.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage("Couldn't get post at the moment try again later");
    }
  };

  // Pagination
  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  {
    return loading ? (
      <Loader />
    ) : posts?.length < 1 ? (
      <div className="msg">
        <h1>{message ? message : "No Post Found."}</h1>
      </div>
    ) : (
      <div className="articles">
        <section className="top ">
          <div className="overlay"></div>
          <div className="text">
            <h1>Articles</h1>
          </div>
        </section>

        <main className="posts">
          {posts?.length > 0 &&
            posts.map((post) => (
              <div key={post?._id} className="post">
                <div className="post-img">
                  <img src={`${post?.file}`} alt={post?.postTitle} />
                </div>
                <div className="post-body">
                  <h2>
                    <Link to={`/articles/${post?.slug}`}>
                      {post?.postTitle}
                    </Link>
                  </h2>
                  <p className="post-content">
                    {post?.content?.length > 100
                      ? post?.content.slice(0, 140) + "..."
                      : post?.content}
                  </p>
                  <div>
                    <div className="post_auth">
                      <div className="art_cat">
                        <img src="../icons/tag.png" alt="" />
                        <p>{post?.category}</p>
                      </div>
                      <div className="art_cat">
                        <img src="../icons/user.png" alt="" />
                        <p className="author">{post?.author?.username}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </main>
        <div className="footer-pagination">
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

export default Articles;
