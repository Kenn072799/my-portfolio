import axios from "../../api/axios";
import adminAxios from "./adminAxios";

export const getExperiences = async ({ page = 1, pageSize = 50 } = {}) => {
  const res = await axios.get("/api/experiences", {
    params: { page, pageSize },
  });
  return res.data;
};

export const createExperience = async (data) => {
  const res = await adminAxios.post("/api/experiences", data);
  return res.data;
};

export const updateExperience = async (id, data) => {
  const res = await adminAxios.put(`/api/experiences/${id}`, data);
  return res.data;
};

export const deleteExperience = async (id) => {
  await adminAxios.delete(`/api/experiences/${id}`);
};
