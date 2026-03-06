import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Chatbot from "../components/chatbot/Chatbot";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 max-w-190 mx-auto px-4 w-full">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
      <div className="right-4 bottom-4 fixed">
        <Chatbot />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
