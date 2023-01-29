import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getOne, getAll };
