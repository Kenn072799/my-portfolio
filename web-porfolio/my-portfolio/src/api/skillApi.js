import axios from './axios';
import { fetchAllPages } from './fetchAllPages';
export const getSkills = () => fetchAllPages(async (page) => {
  const response = await axios.get('/api/skills', { params: { page, pageSize: 50 } });
  return response.data;
});
