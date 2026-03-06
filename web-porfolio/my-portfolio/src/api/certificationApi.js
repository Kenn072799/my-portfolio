import axios from "./axios";

export const getCertifications = async () => {
  const response = await axios.get("/api/certifications", {
    params: {
      page: 1,
      pageSize: 20,
    },
  });

  return response.data.data;
};