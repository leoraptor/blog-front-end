import axios from "axios";
const SERVER_URL = process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("dToken");

    if (token) {
      config.headers["access_token"] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
