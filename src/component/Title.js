import axios from "axios";

const API = axios.create({
  baseURL: "https://adonde-kr.herokuapp.com/city/findOne",
});

export default API;
