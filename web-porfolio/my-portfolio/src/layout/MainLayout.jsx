import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-190 mx-auto px-4">
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
