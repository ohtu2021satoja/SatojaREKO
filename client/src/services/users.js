import axios from "axios";

const apiUrl = "/api/users";

const getUsers = () => {
  const request = axios.get(`${apiUrl}`);
  return request.then((response) => response.data);
};

const getUser = (id) => {
  const request = axios.get(`${apiUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getUsers, getUser };
