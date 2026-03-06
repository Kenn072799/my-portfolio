import React from "react";
import Heading from "./common/Heading";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Experience = ({ experiences = [], loading = false }) => {
  return (
    <section className="p-4 flex-1">
      <Heading size="md" weight="md" className="mb-4">
        Experience
      </Heading>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border-default" />

        {loading ? (
          <div className="space-y-8 pl-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse space-y-1">
                <div className="h-3 bg-bg-muted rounded w-3/4" />
                <div className="h-2 bg-bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <p className="text-sm text-text-muted pl-8">No experience listed yet.</p>
        ) : (
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
                  : "bg-bg-main border-2 border-border-default"
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
        )}
      </div>
    </section>
  );
};

export default Experience;
