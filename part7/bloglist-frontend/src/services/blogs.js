import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = (id) => {
  const request = axios.get(baseUrl + "/" + id);
  return request.then((response) => response.data);
};

const getComments = (id) => {
  const request = axios.get(baseUrl + "/" + id + "/comments");
  return request.then((response) => response.data);
};

const create = (title, author, url) => {
  const request = axios.post(
    baseUrl,
    { title, author, url },
    { headers: { authorization: token } }
  );
  return request.then((response) => response.data);
};

const createComment = (id, content) => {
  const request = axios.post(baseUrl + "/" + id + "/comments", { content });
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(baseUrl + "/" + id, {
    headers: { authorization: token },
  });
  return request.then((response) => response.data);
};

const addLike = (id, blog) => {
  const request = axios.put(baseUrl + "/" + id, blog, {
    headers: { authorization: token },
  });
  return request.then((response) => response.data);
};

export default {
  setToken,
  getAll,
  getOne,
  create,
  createComment,
  remove,
  addLike,
  getComments,
};
