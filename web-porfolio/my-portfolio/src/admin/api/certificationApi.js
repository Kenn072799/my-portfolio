import axios from "../../api/axios";
import adminAxios from "./adminAxios";

export const getCertifications = async ({ page = 1, pageSize = 50 } = {}) => {
  const res = await axios.get("/api/certifications", {
    params: { page, pageSize },
  });
  return res.data;
};

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
