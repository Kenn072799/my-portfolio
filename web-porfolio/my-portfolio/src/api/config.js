// Local requests use Vite's same-origin proxy, including on 127.0.0.1.
export const API_BASE_URL = import.meta.env.DEV
  ? '/portfolio-api'
  : import.meta.env.VITE_API_URL || 'http://localhost:8080';
