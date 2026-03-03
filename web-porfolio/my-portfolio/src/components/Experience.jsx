import React from "react";
import Heading from "./common/Heading";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Associate Software Engineer",
    company: "Accenture Philippines",
    year: "2025",
    current: true,
  },
  {
    title: "BS Information Technology",
    company: "STI College Ortigas-Cainta",
    year: "2025",
    current: false,
  },
  {
    title: "Hello World!",
    company: "Write my first program",
    year: "2021",
    current: false,
  },
];

const Experience = () => {
  return (
    <section className="p-4 flex-1">
      <Heading size="md" weight="md" className="mb-4">
        Experience
      </Heading>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border-default" />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-8"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={fadeUpItem(20)}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative pl-8 flex gap-4"
            >
              {/* Dot */}
              <span
                className={`mt-1 w-3 h-3 rounded-full shrink-0
              ${
                experience.current
                  ? "bg-text-primary"
                  : "bg-white border-2 border-border-default"
              }`}
              />

              {/* Horizontal connector */}
              <span className="absolute left-2 top-2 w-5 h-0.5 bg-border-default" />

              {/* Content */}
              <div className="text-sm w-full">
                <p className="font-bold leading-snug">{experience.title}</p>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4 text-text-muted text-xs">
                  <p className="font-semibold">{experience.company}</p>
                  <p className="whitespace-nowrap text-right">
                    {experience.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
