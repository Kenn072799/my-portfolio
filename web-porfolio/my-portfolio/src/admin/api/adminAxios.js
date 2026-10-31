import axios from "axios";
import { API_BASE_URL } from '../../api/config';

const adminAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

adminAxios.interceptors.request.use((config) => {
  const apiKey = sessionStorage.getItem("admin_api_key");
  if (apiKey) {
    config.headers["X-Api-Key"] = apiKey;
  }
  return config;
});

export default adminAxios;
