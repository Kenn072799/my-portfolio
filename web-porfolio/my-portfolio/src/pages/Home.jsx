import React from "react";
import Header from "../components/Header";
import About from "../components/About";
import Experience from "../components/Experience";
import TechStack from "../components/TechStack";
import RecentProject from "../components/RecentProject";
import RecentCertification from "../components/RecentCertification";

const Home = () => {
  return (
    <div>
      <Header />
      <About />
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 items-start">
        <TechStack />
        <Experience />
      </div>
      <RecentProject />
      <RecentCertification />
    </div>
  );
};

export default Home;
