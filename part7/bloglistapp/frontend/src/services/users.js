import axios from "axios";

const baseUrl = "/api/users";

const config = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };
};
const getAll = () => {
  const request = axios.get(baseUrl, config);

  return request.then((response) => response.data);
};

export default { getAll };
