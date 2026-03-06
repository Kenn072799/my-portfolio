import axios from "../../api/axios";
import adminAxios from "./adminAxios";

export const getProjects = async ({ page = 1, pageSize = 50 } = {}) => {
  const res = await axios.get("/api/projects", { params: { page, pageSize } });
  return res.data;
};

export const createProject = async (data) => {
  const res = await adminAxios.post("/api/projects", data);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await adminAxios.put(`/api/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  await adminAxios.delete(`/api/projects/${id}`);
};
