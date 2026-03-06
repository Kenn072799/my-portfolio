import axios from "axios";

const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7197",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

adminAxios.interceptors.request.use((config) => {
  // Prefer the key stored at login time; fall back to env (dev convenience)
  const apiKey =
    sessionStorage.getItem("admin_api_key") ||
    import.meta.env.VITE_ADMIN_API_KEY;
  if (apiKey) {
    config.headers["X-Api-Key"] = apiKey;
  }
  return config;
});

export default adminAxios;
