import axios from "axios";

const api = axios.create({
  baseURL: "https://coded-task-authentication-be.herokuapp.com",
});
export default api;
