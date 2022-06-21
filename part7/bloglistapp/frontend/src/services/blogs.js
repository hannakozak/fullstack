import axios from "axios";

const baseUrl = "/api/blogs";

const config = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config());
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config());
};

export default { getAll, create, update, remove };
