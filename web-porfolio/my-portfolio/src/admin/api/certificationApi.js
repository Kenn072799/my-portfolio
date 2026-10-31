import { readCollection } from "./readCollection";
import adminAxios from "./adminAxios";

export const getCertifications = (options) => readCollection("/api/certifications", options);

export const createCertification = async (data) => {
  const res = await adminAxios.post("/api/certifications", data);
  return res.data;
};

export const updateCertification = async (id, data) => {
  const res = await adminAxios.put(`/api/certifications/${id}`, data);
  return res.data;
};

export const deleteCertification = async (id) => {
  await adminAxios.delete(`/api/certifications/${id}`);
};
