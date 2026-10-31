import { readCollection } from "./readCollection";
import adminAxios from "./adminAxios";

export const getExperiences = (options) => readCollection("/api/experiences", options);

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
