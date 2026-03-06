import React from "react";
import Heading from "./common/Heading";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Experience = ({ experiences, loading, error }) => {
  return (
    <section className="p-4 flex-1">
      <Heading size="md" weight="md" className="mb-4">
        Experience
      </Heading>

      {loading ? (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border-default" />

          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative pl-8 flex gap-4 animate-pulse">
                {/* Dot */}
                <span className="mt-1 w-3 h-3 rounded-full shrink-0 bg-bg-muted" />

                {/* Horizontal connector */}
                <span className="absolute left-2 top-2 w-5 h-0.5 bg-bg-muted" />

                {/* Content */}
                <div className="text-sm w-full space-y-2">
                  {/* Title */}
                  <div className="h-4 w-40 rounded bg-bg-muted" />

                  {/* Company + Year */}
                  <div className="flex justify-between">
                    <div className="h-3 w-32 rounded bg-bg-muted" />
                    <div className="h-3 w-12 rounded bg-bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : experiences.length > 0 ? (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border-default" />

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {experiences.map((experience) => (
              <motion.div
                key={experience.id}
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
                      {new Date(experience.startDate).getFullYear() ===
                        new Date(experience.endDate).getFullYear() ||
                      experience.current === true
                        ? new Date(experience.startDate).getFullYear()
                        : `${new Date(experience.startDate).getFullYear()} - ${
                            experience.endDate
                              ? new Date(experience.endDate).getFullYear()
                              : ""
                          }`}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : (
        <motion.div
          variants={fadeUpItem(20)}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center
                     border border-dashed border-border-default
                     rounded-lg py-12 text-center"
        >
          <span className="material-symbols-outlined text-4xl text-text-muted mb-3 work_history">
            work_history
          </span>

          <p className="font-semibold text-text-primary">
            No experience available
          </p>

          <p className="text-sm text-text-muted mt-1 max-w-xs">
            Experience will appear here once it is added.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default Experience;
