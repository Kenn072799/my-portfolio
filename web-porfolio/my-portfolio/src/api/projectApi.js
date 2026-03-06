import axios from "./axios";

export const getProjects = async () => {
  const response = await axios.get("/api/projects", {
    params: {
      page: 1,
      pageSize: 10,
    },
  });

  return response.data.data; // return the array directly
};