import axios from "./axios";

export const sendChatMessage = async (message) => {
  const response = await axios.post("/api/chat", {
    message,
  });

  return response.data.reply;
};