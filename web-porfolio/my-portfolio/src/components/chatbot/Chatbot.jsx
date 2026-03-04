import React, { useState } from "react";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai";
import { vibrate } from "../../utils/vibrate";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ProfileAvatar from "./ProfileAvatar";
import ChatInput from "./ChatInput";

const Chatbot = () => {
  const [openChat, setOpenChat] = useState(false);

  const clickChat = () => {
    setOpenChat((prev) => !prev);
    vibrate(8);
  };

  return (
    <>
      <AnimatePresence>
        {/* Floating Button */}
        {!openChat && (
          <motion.button
            key="chat-button"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={clickChat}
            className="
        fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 
        rounded-sm shadow-lg bg-text-primary text-white
        text-sm font-medium hover:shadow-xl hover:-translate-y-0.5 
        active:translate-y-0 transition z-50 cursor-pointer
        "
          >
            <AiOutlineMessage size={18} />
            <span>Ask about Kenneth</span>
          </motion.button>
        )}

        {/* Chat Window */}
        {openChat && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 250, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 120, y: 250, scale: 0.1 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 md:bottom-6 right-0 md:right-6 h-svh md:w-104 md:h-128 bg-white shadow-2xl rounded-lg border border-border-default flex flex-col overflow-hidden z-40"
          >
            {/* Chat Header */}
            <div
              className="bg-bg-card flex items-center border-b border-border-default justify-between text-text-primary px-4 py-3 cursor-pointer hover:bg-black/5"
              onClick={clickChat}
            >
              <div className="flex flex-col leading-tight ">
                <p className="text-sm font-semibold">Kenneth Assistant</p>
                <span className="text-xs opacity-80">AI Portfolio Guide</span>
              </div>

              <AiOutlineClose size={18} />
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 space-y-4">
              {/* Assistant greeting */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8">
                  <ProfileAvatar />
                </div>

                <div className="bg-bg-card border border-border-default rounded-lg px-3 py-2 max-w-[80%]">
                  <p className="font-medium text-text-primary mb-1">Hello 👋</p>
                  <p className="text-text-secondary">
                    I can answer questions about Kenneth's experience, projects,
                    and AI work.
                  </p>
                </div>
              </div>
            </div>

            {/* Input */}
            <ChatInput />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
