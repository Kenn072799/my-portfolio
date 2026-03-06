import React, { useState } from "react";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai";
import { vibrate } from "../../utils/vibrate";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ProfileAvatar from "./ProfileAvatar";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ChatSuggestedQuestion from "./ChatSuggestedQuestion";
import { sendChatMessage } from "../../api/chatApi";

const Chatbot = () => {
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const clickChat = () => {
    setOpenChat((prev) => !prev);
    vibrate(8);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const reply = await sendChatMessage(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect to the server. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!openChat && (
          <motion.button
            key="chat-button"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={clickChat}
            className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-sm shadow-lg bg-text-primary text-bg-main text-sm font-medium hover:opacity-90 transition z-50 cursor-pointer"
          >
            <AiOutlineMessage size={18} />
            <span>Ask about Kenneth</span>
          </motion.button>
        )}

        {openChat && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 250 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-0 w-full md:bottom-6 right-0 md:right-6 h-svh md:w-104 md:h-128 bg-bg-main shadow-2xl rounded-lg border border-border-default flex flex-col overflow-hidden z-40"
          >
            {/* Header */}
            <div
              className="bg-bg-card flex items-center justify-between border-b border-border-default px-4 py-2 cursor-pointer"
              onClick={clickChat}
            >
              <div>
                <p className="text-sm font-semibold">Kenneth's Assistant</p>
                <span className="text-xs text-text-muted">
                  AI Portfolio Assistant • Powered by Groq
                </span>
              </div>

              <AiOutlineClose size={18} />
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4">
              {messages.length === 0 ? (
                <>
                  {/* Welcome */}
                  <div className="flex flex-col items-center justify-start text-center gap-4 h-full px-4">
                    {/* Avatar */}
                    <div className="w-20 h-20">
                      <ProfileAvatar />
                    </div>

                    {/* Greeting */}
                    <div className="max-w-xs">
                      <p className="font-semibold text-text-primary">Hello</p>
                      <p className="text-text-secondary mt-1">
                        Ask me anything about Kenneth.
                      </p>
                    </div>

                    {/* Suggested questions */}
                    <ChatSuggestedQuestion sendMessage={sendMessage} />
                  </div>
                </>
              ) : (
                <ChatMessage messages={messages} loading={loading} />
              )}
            </div>

            <ChatInput onSend={sendMessage} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
