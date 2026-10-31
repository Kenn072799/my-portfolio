import axios from '../../api/axios';
import { fetchAllPages } from '../../api/fetchAllPages';
export async function readCollection(path, { page = 1, pageSize = 50, all = false } = {}) {
  async function fetchPage(current) { return (await axios.get(path, { params: { page: current, pageSize } })).data; }
  if (!all) return fetchPage(page);
  const data = await fetchAllPages(fetchPage);
  return { data, totalCount: data.length };
}
