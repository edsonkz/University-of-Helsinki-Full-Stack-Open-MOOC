import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { Form, Button } from "react-bootstrap";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createNewBlog = (e) => {
    e.preventDefault();
    console.log("Hello");
    dispatch(
      setNotification(`A new blog ${title} by ${author} was added`, 5, false)
    );
    dispatch(createBlog(title, author, url));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="square border p-3 mb-3">
      <h3>Create a New Blog</h3>
      <Form onSubmit={createNewBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            className="mb-3"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            className="mb-3"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            className="mb-3"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button className="create" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlog;
