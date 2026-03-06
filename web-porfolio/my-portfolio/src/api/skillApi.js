import axios from "./axios";

export const getSkills = async () => {
  const response = await axios.get("/api/skills", {
    params: {
      page: 1,
      pageSize: 50,
    },
  });

  return response.data.data;
};