import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import blogServices from "../services/blogs";
import userServices from "../services/users";

const User = () => {
  const id = useParams().id;
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getBlogsUser = async () => {
      const data = await blogServices.getAll();
      const filteredBlogs = data.filter((blog) => blog.user.id === id);
      setBlogs(filteredBlogs);
    };

    const getUser = async () => {
      const data = await userServices.getOne(id);
      console.log(data);
      setUser(data);
    };

    getUser();
    getBlogsUser();
  }, []);

  return (
    <div>
      {user ? <h1>{user.name}</h1> : <></>}
      <h2>added blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
