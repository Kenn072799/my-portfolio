import React from "react";
import Header from "../components/Header";
import About from "../components/About";
import Experience from "../components/Experience";
import TechStack from "../components/TechStack";
import RecentProject from "../components/RecentProject";
import RecentCertification from "../components/RecentCertification";
import { usePortfolioData } from "../hooks/usePortfolioData";

const Home = () => {
  const { projects, stacks, experiences, certifications, loading } =
    usePortfolioData();

  return (
    <div>
      <Header />
      <About />
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 items-start">
        <div className="order-2 lg:order-1">
          <TechStack stacks={stacks} loading={loading} />
        </div>
        <div className="order-1 lg:order-2">
          <Experience experiences={experiences} loading={loading} />
        </div>
      </div>
      <RecentProject projects={projects} loading={loading} />
      <RecentCertification certifications={certifications} loading={loading} />
    </div>
  );
};

export default Home;
