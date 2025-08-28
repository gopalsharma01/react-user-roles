import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // your Laravel API endpoint
});

// Request Interceptor (before request is sent)
api.interceptors.request.use(
  (config) => {
    // Example: add auth token
    const token = process.env.REACT_APP_API_KEY;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;