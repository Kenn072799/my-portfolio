import React from "react";
import Heading from "./common/Heading";
import { Link } from "react-router-dom";
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
];

const RecentCertification = () => {
  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <Heading size="md" weight="md">
          Recent Certifications
        </Heading>

        {certifications.length > 4 && (
          <Link
            to="recent-certification"
            onClick={() => vibrate(12)}
            className="text-sm font-semibold px-3 py-1 flex items-center gap-1
                   border border-border-default rounded
                   hover:bg-gray-100 transition"
          >
            View All
            <span className="material-symbols-outlined">
              arrow_forward_ios
            </span>
          </Link>
        )}
      </div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col gap-3"
      >
        {certifications.length > 0 ? (
          <>
            {certifications.slice(0, 4).map((certification, index) => (
              <motion.div
                key={index}
                variants={fadeUpItem(20)}
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
          </>
        ) : (
          <motion.div
            variants={fadeUpItem(20)}
            transition={{ duration: 0.4 }}
            className="col-span-full flex flex-col items-center justify-center
                      border border-dashed border-border-default
                      rounded-lg py-12 text-center"
          >
            <span className="material-symbols-outlined verified_off text-text-muted mb-3">
              verified_off
            </span>

            <p className="font-semibold text-text-primary">
              No certificates available
            </p>

            <p className="text-sm text-text-muted mt-1 max-w-xs">
              Certificates will appear here once they are added.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default RecentCertification;
