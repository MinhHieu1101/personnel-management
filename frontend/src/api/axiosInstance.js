import axios from "axios";
import store from "../redux/store";

const API_URL = import.meta.env.VITE_REST_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    if (auth.accessToken) {
      config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const authHeader = response.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const newToken = authHeader.split(" ")[1];
      store.dispatch({ type: "TOKEN_RENEW", payload: newToken });
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
