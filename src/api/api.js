import axios from "axios";

// Base URL do backend
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para adicionar o token em cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // pega o token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // adiciona no header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
