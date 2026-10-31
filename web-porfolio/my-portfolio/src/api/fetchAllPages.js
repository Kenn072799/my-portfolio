// Follow the API's pagination metadata rather than silently truncating collections.
export async function fetchAllPages(fetchPage) {
  const first = await fetchPage(1);
  if (!Array.isArray(first.data)) throw new Error('Invalid collection response');
  const records = [...first.data];
  const totalPages = Number(first.totalPages ?? 1);
  if (!Number.isSafeInteger(totalPages) || totalPages < 0) throw new Error('Invalid pagination metadata');
  for (let page = 2; page <= totalPages; page++) {
    const result = await fetchPage(page);
    if (!Array.isArray(result.data)) throw new Error('Invalid collection response');
    records.push(...result.data);
  }
  return records;
}
