import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Notification from "./components/Notification";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Header from "./components/Header";
import Users from "./components/Users";
import User from "./components/User";

import blogsService from "./services/blogs";

import { initializeBlogs } from "./reducers/blogReducer";
import { savedUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(savedUser(user));
      blogsService.setToken(user.token);
      dispatch(initializeBlogs(user));
    }
  }, []);

  const userForm = () => {
    return (
      <div>
        {createForm()}
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
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
      <Router>
        <Header />
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/" element={<Users />} />
          <Route
            path="/"
            element={user === null ? <LoginForm /> : userForm()}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
