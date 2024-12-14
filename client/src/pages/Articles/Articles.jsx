import { Link } from "react-router-dom";
import "./Articles.scss";
import axiosInstance from "../../components/Utils/axiosInstance";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader/Loader";

const Articles = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        setMessage("");
        const response = await axiosInstance.get("/posts");
        setPosts(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage("Couldn't get post at the moment try again later");
      }
    };
    getPosts();
  }, []);

  {
    return loading ? (
      <Loader />
    ) : posts.length < 1 ? (
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
              <div key={post._id} className="post">
                <div className="post-img">
                  <img src={`${post.file}`} alt={post.postTitle} />
                </div>
                <div className="post-body">
                  <h2>
                    <Link to={`/articles/${post.slug}`}>{post?.postTitle}</Link>
                  </h2>
                  <p className="post-content">
                    {post?.content?.length > 100
                      ? post?.content.slice(0, 140) + "..."
                      : post.content}
                  </p>
                  <p>Tag : {post?.category}</p>
                  <p className="author">posted by : {post?.author?.username}</p>
                </div>
              </div>
            ))}
        </main>
      </div>
    );
  }
};

export default Articles;
