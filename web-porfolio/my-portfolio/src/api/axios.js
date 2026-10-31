import axios from 'axios';
import { API_BASE_URL } from './config';

// Render may need more than 20 seconds to wake a sleeping instance.
const axiosInstance = axios.create({ baseURL: API_BASE_URL, timeout: 60000 });
export default axiosInstance;
