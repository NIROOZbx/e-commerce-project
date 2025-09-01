

import axios from "axios";

// Create a custom axios instance
const api = axios.create({
  // Use the VITE_API_URL from environment variables, or fallback to localhost
  baseURL: "https://ecommerce-api-3bc3.onrender.com" || "http://localhost:5000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;