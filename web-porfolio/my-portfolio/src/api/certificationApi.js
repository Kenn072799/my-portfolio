import axios from './axios';
import { fetchAllPages } from './fetchAllPages';

export const getCertifications = () => fetchAllPages(async (page) => {
  const response = await axios.get('/api/certifications', { params: { page, pageSize: 50 } });
  return response.data;
});
