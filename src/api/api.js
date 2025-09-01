import axios from "axios";

// Create a custom axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/", // Change to your server URL
  timeout: 10000, // 10s timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api