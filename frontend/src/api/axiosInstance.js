import axios from "axios";
import store from "../redux/store";
import {
  tokenRenewSuccess,
  tokenRenewRequest,
  logout,
} from "../redux/actions/authActions";

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
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    //console.log(`Current Token: ${accessToken}`);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const authHeader = response.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const newToken = authHeader.split(" ")[1];
      //console.log(`New Token: ${newToken}`);
      sessionStorage.setItem("accessToken", newToken);
      store.dispatch(tokenRenewSuccess(newToken));
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const currentUser = store.getState().auth.user;
      if (currentUser?.userId) {
        store.dispatch(tokenRenewRequest(currentUser.userId));

        const freshToken = await new Promise((resolve) => {
          const unsubscribe = store.subscribe(() => {
            const state = store.getState().auth;
            if (
              state.accessToken !==
              originalRequest.headers.Authorization?.split(" ")[1]
            ) {
              unsubscribe();
              resolve(state.accessToken);
            }
          });
        });

        if (freshToken) {
          originalRequest.headers.Authorization = `Bearer ${freshToken}`;
          return axiosInstance(originalRequest);
        }
      }

      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
