import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import blogServices from "../services/blogs";
import userServices from "../services/users";
import { ListGroup, ListGroupItem } from "react-bootstrap";

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
      <h3>Added Blogs</h3>
      <ListGroup variant="flush">
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
