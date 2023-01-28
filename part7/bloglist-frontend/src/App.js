import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import blogsService from "./services/blogs";
import "./style.css";
import { initializeBlogs } from "./reducers/blogReducer";
import { logoutUser, savedUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const setBlogs = () => {};
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(savedUser(user));
      blogsService.setToken(user.token);
      dispatch(initializeBlogs(user));
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleRemoveBlog = async (id) => {
    await blogsService.remove(id);
    let oldBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(oldBlogs);
  };

  const userForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged-in <button onClick={handleLogout}>logout</button>
        </p>
        {createForm()}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleRemoveBlog={handleRemoveBlog} />
        ))}
      </div>
    );
  };

  const createForm = () => {
    return (
      <Togglable buttonLabel="new blog">
        <CreateBlog />
      </Togglable>
    );
  };

  return (
    <div>
      <Notification />
      {user === null ? <LoginForm /> : userForm()}
    </div>
  );
};

export default App;
