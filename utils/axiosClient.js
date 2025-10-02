// utils/axiosClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "/", //process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/",
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token"); // or cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // logout or redirect
      console.error("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;
