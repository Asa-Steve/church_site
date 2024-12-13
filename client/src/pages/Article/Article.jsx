import { Link, useParams } from "react-router-dom";
import "./Article.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../components/Utils/axiosInstance";
import Loader from "../../components/common/Loader/Loader";

const Article = () => {
  const { articleSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${articleSlug}`);
        setPost(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getPost();
  }, []);

  {
    return loading ? (
      <Loader />
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
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Article;
