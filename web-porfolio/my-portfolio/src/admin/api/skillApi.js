import axios from "../../api/axios";
import adminAxios from "./adminAxios";

export const getSkills = async ({ page = 1, pageSize = 100 } = {}) => {
  const res = await axios.get("/api/skills", { params: { page, pageSize } });
  return res.data;
};

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
