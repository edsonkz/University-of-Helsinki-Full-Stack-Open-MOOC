import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createNewBlog = (e) => {
    e.preventDefault();
    dispatch(
      setNotification(`A new blog ${title} by ${author} was added`, 5, false)
    );
    dispatch(createBlog(title, author, url));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            name="title"
            className="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            name="author"
            className="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            type="text"
            name="url"
            className="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="create">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
