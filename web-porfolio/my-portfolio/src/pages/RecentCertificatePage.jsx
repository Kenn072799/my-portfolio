import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/common/Heading";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { vibrate } from "../utils/vibrate";

const certifications = [
  {
    name: "Azure Fundamentals (AZ-900)",
    from: "Microsoft",
    description: "Cloud concepts and Azure services.",
  },
  {
    name: "AWS Cloud Practitioner",
    from: "Amazon Web Services",
    description: "Core AWS cloud knowledge.",
  },
  {
    name: "Responsive Web Design",
    from: "freeCodeCamp",
    description: "HTML and CSS fundamentals.",
  },
  {
    name: "Java Programming Certificate",
    from: "Oracle",
    description: "Java basics and OOP concepts.",
  },
  {
    name: "Azure Fundamentals (AZ-900) Azure Fundamentals (AZ-900) Azure Fundamentals (AZ-900) Azure Fundamentals (AZ-900)",
    from: "Microsoft",
    description: "Cloud concepts and Azure services.",
  },
  {
    name: "AWS Cloud Practitioner",
    from: "Amazon Web Services",
    description: "Core AWS cloud knowledge.",
  },
  {
    name: "Responsive Web Design",
    from: "freeCodeCamp",
    description: "HTML and CSS fundamentals.",
  },
  {
    name: "Java Programming Certificate",
    from: "Oracle",
    description: "Java basics and OOP concepts.",
  },
];

const RecentCertificatePage = () => {
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
          onClick={() => {
            navigate(-1);
            vibrate(12);
          }}
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
          All Recent Certifications
        </Heading>
      </div>
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col sm:grid gap-4 sm:grid-cols-2"
      >
        {certifications.map((certification, index) => (
          <motion.div
            key={index}
            variants={fadeUpItem(10)}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => vibrate(8)}
            className="relative px-8 py-3 border border-border-default
                   before:absolute before:left-0 before:top-0 before:h-full before:w-3
                   before:bg-linear-to-b before:from-blue-400 before:via-blue-500 before:to-accent-main
                   hover:shadow-md transition"
          >
            <p className="font-bold truncate" title={certification.name}>
              {certification.name}
            </p>
            <p className="text-text-secondary font-semibold text-sm">
              {certification.from}
            </p>
            <p className="text-sm text-text-secondary">
              {certification.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecentCertificatePage;
