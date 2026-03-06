import React from "react";
import Heading from "./common/Heading";
import { fadeUpItem } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TechStack = ({ stacks, loading }) => {
  if (loading) {
    return (
      <section className="p-4 rounded-md bg-bg-muted/30">
        <Heading size="md" weight="md" className="mb-4">
          Tech Stack
        </Heading>

        {[...Array(3)].map((_, groupIndex) => (
          <div key={groupIndex} className="mb-4 animate-pulse">
            {/* Category title */}
            <div className="h-4 w-32 rounded bg-bg-muted mb-2" />

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-6 w-20 rounded-full bg-bg-muted" />
              ))}
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="p-4 rounded-md bg-bg-muted/30">
      <Heading size="md" weight="md" className="mb-4">
        Tech Stack
      </Heading>

      {stacks.length > 0 ? (
        stacks.map((stack) => (
          <div key={stack.title} className="mb-4">
            <Heading weight="md" className="mb-2 text-sm">
              {stack.title}
            </Heading>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {stack.items.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUpItem(10)}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="px-3 py-1 rounded-full text-xs font-semibold
                         border border-border-default bg-bg-card
                         text-text-secondary"
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))
      ) : (
        <motion.div
          variants={fadeUpItem(20)}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center
                 border border-dashed border-border-default
                 rounded-lg py-12 text-center"
        >
          <span className="material-symbols-outlined text-4xl text-text-muted mb-3 memory">
            memory
          </span>

          <p className="font-semibold text-text-primary">
            No tech stack available
          </p>

          <p className="text-sm text-text-muted mt-1 max-w-xs">
            Technologies will appear here once they are added.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default TechStack;
