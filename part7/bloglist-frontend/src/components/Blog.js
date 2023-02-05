import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { voteOn, removeBlog } from "../reducers/blogReducer";
import blogServices from "../services/blogs";

import { Button } from "react-bootstrap";

const Blog = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      const blog = await blogServices.getOne(id);
      const comments = await blogServices.getComments(id);
      setBlog(blog);
      setComments(comments);
    };

    getBlog();
  }, []);

  const addLike = () => {
    dispatch(voteOn(blog));
    setBlog({ ...blog, likes: blog.likes + 1 });
  };

  const addComment = async () => {
    const comment = await blogServices.createComment(id, content);
    setComments(comments.concat(comment));
    setContent("");
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  return (
    <div className="blog">
      {blog ? (
        <>
          <div>
            <h1>
              {blog.title} {blog.author}{" "}
            </h1>
            <a href={blog.url}>{blog.url}</a>
            <br />
            likes {blog.likes}
            <Button onClick={addLike}>like</Button>
            <br />
            added by {blog.user.name}
            <br />
          </div>
          <div className="comments">
            <h3>Comments</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))}
            </ul>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={addComment}>add comment</Button>
          </div>
        </>
      ) : (
        <h3>Blog not found...</h3>
      )}
    </div>
  );
};

export default Blog;
