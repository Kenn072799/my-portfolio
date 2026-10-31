import { readCollection } from "./readCollection";
import adminAxios from "./adminAxios";

export const getSkills = (options) => readCollection("/api/skills", options);

export const createSkill = async (data) => {
  const res = await adminAxios.post("/api/skills", data);
  return res.data;
};

export const updateSkill = async (id, data) => {
  const res = await adminAxios.put(`/api/skills/${id}`, data);
  return res.data;
};

export const deleteSkill = async (id) => {
  await adminAxios.delete(`/api/skills/${id}`);
};
