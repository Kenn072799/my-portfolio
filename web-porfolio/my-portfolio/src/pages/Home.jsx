import React from "react";
import Header from "../components/Header";
import About from "../components/About";
import Experience from "../components/Experience";
import TechStack from "../components/TechStack";
import RecentProject from "../components/RecentProject";

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
    </div>
  );
};

export default Home;
