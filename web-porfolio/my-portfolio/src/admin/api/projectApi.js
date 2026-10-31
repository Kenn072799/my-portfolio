import { readCollection } from "./readCollection";
import adminAxios from "./adminAxios";

export const getProjects = (options) => readCollection("/api/projects", options);

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
