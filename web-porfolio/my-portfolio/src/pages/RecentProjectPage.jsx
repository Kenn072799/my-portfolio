import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "../components/common/Heading";
import CardProject from "../components/card/project/CardProject";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
  {
    name: "AI RAG Q&A",
    description: "Ask questions from documents.",
    link: "https://github.com/yourusername/ai-rag-qna",
    linkName: "ask-ai.com",
    tags: ["Azure", "Python", "RAG"],
  },
];

const RecentProjectPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="py-4">
      {/* Back button and Heading */}
      <div className="flex gap-4 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold px-3 py-1 flex items-center gap-1
        border border-border-default rounded
        hover:bg-gray-100 transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-xs">
            arrow_back_ios
          </span>
          Go Back
        </button>
        <Heading size="md" weight="md">
          All Recent Projects
        </Heading>
      </div>
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 sm:grid-cols-2 mt-1"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={fadeUpItem(10)}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <CardProject {...project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecentProjectPage;
