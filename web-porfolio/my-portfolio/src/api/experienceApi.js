import axios from './axios';
import { fetchAllPages } from './fetchAllPages';
export const getExperiences = () => fetchAllPages(async (page) => {
  const response = await axios.get('/api/experiences', { params: { page, pageSize: 50 } });
  return response.data;
});
