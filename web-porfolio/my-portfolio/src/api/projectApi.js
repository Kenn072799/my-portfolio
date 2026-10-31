import axios from './axios';
import { fetchAllPages } from './fetchAllPages';

export const getProjects = () => fetchAllPages(async (page) => {
  const response = await axios.get('/api/projects', { params: { page, pageSize: 50 } });
  return response.data;
});
