import axios from "axios";

//declaring baseURL to axios

export default axios.create({
  baseURL: "http://localhost:3003"
});
