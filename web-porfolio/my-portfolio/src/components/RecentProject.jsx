import React from "react";
import Heading from "./common/Heading";
import CardProject from "./card/project/CardProject";

const projects = [
  {
    name: "SmartHome Device Manager",
    description: "Manage and schedule smart home devices.",
    link: "https://github.com/yourusername/smarthome-device-manager",
    linkName: "SmartHome.NET",
    tags: ["C#", ".NET", "WinForms"],
  },
  {
    name: "Job Order System",
    description: "Track and manage job orders.",
    link: "https://github.com/yourusername/job-order-system",
    linkName: "JobOrder.com",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    name: "Portfolio Website",
    description: "Personal website built with React.",
    link: "https://yourdomain.com",
    linkName: "my-portfolio.com",
    tags: ["React", "Tailwind CSS"],
  },
  {
    name: "AI RAG Q&A",
    description: "Ask questions from documents.",
    link: "https://github.com/yourusername/ai-rag-qna",
    linkName: "ask-ai.com",
    tags: ["Azure", "Python", "RAG"],
  },
];

const RecentProject = () => {
  return (
    <section className="max-w-4xl mx-auto p-4 border-b border-border-default">
      <div className="flex items-center justify-between mb-4">
        <Heading size="md" weight="md">
          Recent Projects
        </Heading>
        {projects.length > 4 && (
          <button
            className="text-sm font-semibold cursor-pointer px-2 py-1 flex items-center gap-1
          hover:bg-gray-100 active:bg-gray-200 active:translate-x-1 duration-200 "
          >
            View All
            <span className="material-symbols-outlined arrow">
              arrow_forward_ios
            </span>
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.slice(0, 4).map((project, index) => (
          <CardProject key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default RecentProject;
