import axios from "axios";

// Base URL do seu backend
const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;