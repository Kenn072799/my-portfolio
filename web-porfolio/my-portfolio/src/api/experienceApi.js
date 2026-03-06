import axios from "./axios";

export const getExperiences = async () => {
  const response = await axios.get("/api/experiences", {
    params: {
      page: 1,
      pageSize: 20,
    },
  });

  return response.data.data;
};