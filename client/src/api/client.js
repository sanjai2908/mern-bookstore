import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`, // ✅ moved /api outside the env variable
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Request failed";
    return Promise.reject({ ...error, message, data: error.response?.data });
  }
);

export default api;
