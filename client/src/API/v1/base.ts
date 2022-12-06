import axios from "axios";
import { Tokens } from "../models";

const refresh = async () => {
  const refreshToken = localStorage.getItem("token");

  if (refreshToken) {
    const response = await $apiV1.post<Omit<Tokens, "refresh">>(
      "token/refresh/",
      { refresh: refreshToken }
    );

    localStorage.setItem("accessToken", response.data.access);
  }
};

export const $apiV1 = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "v1/",
});

$apiV1.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
  }

  return config;
});

$apiV1.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await refresh();

        return await $apiV1.request(originalRequest);
      } catch (e) {
        console.error(e);
      }
    }

    throw err;
  }
);
