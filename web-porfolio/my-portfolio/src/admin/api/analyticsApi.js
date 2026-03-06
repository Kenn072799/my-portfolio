import adminAxios from "./adminAxios";

export const getAnalyticsSummary = async () => {
  const res = await adminAxios.get("/api/analytics/summary");
  return res.data;
};

export const getTopQuestions = async () => {
  const res = await adminAxios.get("/api/analytics/questions");
  return res.data;
};

export const getAllVisitors = async () => {
  const res = await adminAxios.get("/api/visitors");
  return res.data;
};
