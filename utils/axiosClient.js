// utils/axiosClient.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "/", // process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/"
});

// Request interceptor: attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    // if (!token) {
    //   // No token: redirect to login immediately
    //   window.location.href = "/auth";
    //   return Promise.reject(new Error("No auth token, redirecting to login"));
    // }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle expired / invalid token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem("auth_token"); // clear token
      localStorage.removeItem("userId");
      console.error("Unauthorized, redirecting to login...");
      window.location.href = "/auth"; // redirect
    }
    return Promise.reject(error);
  }
);

export default api;
