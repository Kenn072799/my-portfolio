import React from "react";
import Heading from "./common/Heading";
import { fadeUpItem } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TechStack = ({ stacks = [], loading = false }) => {
  return (
    <section className="p-4 rounded-md bg-bg-muted/30">
      <Heading size="md" weight="md" className="mb-4">
        Tech Stack
      </Heading>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-3 bg-bg-muted rounded w-1/4" />
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-6 w-16 bg-bg-muted rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : stacks.length === 0 ? (
        <p className="text-sm text-text-muted">No skills added yet.</p>
      ) : stacks.map((stack) => (
        <div key={stack.title} className="mb-4">
          <Heading weight="md" className="mb-2 text-sm">
            {stack.title}
          </Heading>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.8 }}
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
      ))}
    </section>
  );
};

export default TechStack;
