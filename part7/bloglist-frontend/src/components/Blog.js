import { useState } from "react";
import { useDispatch } from "react-redux";
import { voteOn, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = () => {
    dispatch(voteOn(blog));
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        <div style={showWhenVisible} className="subInfo">
          {blog.title} by {blog.author}{" "}
          <button onClick={toggleVisibility}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={addLike}>like</button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={deleteBlog}>remove</button>
        </div>
        <div style={hideWhenVisible} className="mainInfo">
          {blog.title} by {blog.author}{" "}
          <button onClick={toggleVisibility} className="viewButton">
            view
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
