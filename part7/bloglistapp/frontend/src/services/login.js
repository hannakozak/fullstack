import axios from "axios";
const baseUrl = "/api/login";

let token = null;
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  token = response.data.token;
  return response.data;
};

const getToken = () => token;

export default { login, getToken };
