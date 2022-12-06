import axios from "axios";

export const _axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    // Authorization: `Bearer ${this.accessToken}`,
  },
});
