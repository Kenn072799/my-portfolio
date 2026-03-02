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
      <div className="flex gap-2 border-b border-border-default">
        <TechStack />
        <Experience />
      </div>
      <RecentProject />
      <RecentCertification />
    </div>
  );
};

export default Home;
