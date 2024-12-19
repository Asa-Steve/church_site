import { Link, useParams, useNavigate } from "react-router-dom";
import "./Article.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../components/Utils/axiosInstance";
import Loader from "../../components/common/Loader/Loader";
import { jwtDecode } from "jwt-decode";

const Article = () => {
  const { articleSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAuthor, setIsAuthor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${articleSlug}`);
        setPost(response?.data?.data);
        setLoading(false);
      } catch ({ response: { data: err } }) {
        setLoading(false);
        setMessage(err?.message || "Post Not Found!!");
      }
    };

    getPost();
  }, []);

  useEffect(() => {
    const decodeToken = async () => {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const { id } = jwtDecode(token);
          if (id === post.author._id) {
            setIsAuthor(true);
          }
        } else {
          setIsAuthor(false);
        }
      } catch (error) {
        setIsAuthor(false);
      }
    };
    decodeToken();
  }, [post]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/posts/${articleSlug}`);
      navigate("/admin");
    } catch (error) {
      console.log("error", error);
    }
  };
  {
    return loading ? (
      <Loader />
    ) : !post ? (
      <div className="msg">
        <h1>{message}</h1>
      </div>
    ) : (
      <>
        <section className="top article">
          <div className="overlay"></div>
          <div className="text">
            <h1>{post?.postTitle}</h1>
          </div>
        </section>
        <div className="stick">
          <div className="event_sect">
            <div className="left">
              <img src={`${post?.file}`} alt="" />
            </div>
            <div className="right">
              <div className="event-head">
                <h2 className="event-title">{post?.postTitle}</h2>
                <div className="event-cat">
                  <i>
                    <img src="../icons/tag.svg" alt="" />
                  </i>
                  {post?.category}
                </div>
              </div>

              <div className="event-body">
                {/* <h3 className="event-tagline">{post?.postTitle}</h3> */}
                <p className="event-info">{post?.content}</p>

                {/* <p className="source">
                  Source: <Link>htps::/example.com</Link>
                </p>

                <div className="modalities">
                  <h3>Order of Event</h3>
                  <li>
                    To begin with the Holy Mass on Thursday 18<sup>th</sup>{" "}
                    September 2024
                  </li>
                  <li>Followed by the resception 12:00pm GMT +1</li>
                  <li>1 X Rice for Each adult male</li>
                  <li>2 X Live Foul for Each adult Female</li>
                  <li>1 X Pack Of Candle for each Youth and Child. </li>
                </div> */}
              </div>

              {isAuthor && (
                <div className="btns">
                  <Link to={`/admin/article/edit/${post.slug}`}>Edit</Link>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Article;
