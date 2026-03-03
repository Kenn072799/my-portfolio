import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 max-w-190 mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Outlet />
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
