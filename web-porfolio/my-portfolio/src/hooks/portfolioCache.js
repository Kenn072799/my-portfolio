import { API_BASE_URL } from '../api/config';
const inFlight = new Map();
const cacheKey = `portfolio-data:v1:${import.meta.env.VITE_API_URL || API_BASE_URL}`;

export function readSnapshot() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(cacheKey) || '{}');
    return Object.fromEntries(Object.entries(saved).filter(([key, value]) =>
      ['projects', 'stacks', 'experiences', 'certifications'].includes(key) && Array.isArray(value)));
  } catch { return {}; }
}
export function saveSnapshot(key, records) {
  try { sessionStorage.setItem(cacheKey, JSON.stringify({ ...readSnapshot(), [key]: records })); }
  catch { /* Storage restrictions must not prevent live content from loading. */ }
}
export function loadCollection(key, fetchData) {
  if (inFlight.has(key)) return inFlight.get(key);
  const request = (async () => {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const result = await fetchData();
        if (!Array.isArray(result)) throw new Error('Invalid portfolio response');
        return result;
      } catch (error) {
        const retryable = !error.response || error.response.status >= 500;
        if (attempt || !retryable) throw error;
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    }
  })().finally(() => inFlight.delete(key));
  inFlight.set(key, request);
  return request;
}
