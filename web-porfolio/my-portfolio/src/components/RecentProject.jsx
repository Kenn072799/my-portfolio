import React from "react";
import Heading from "./common/Heading";
import CardProject from "./card/project/CardProject";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";
import { vibrate } from "../utils/vibrate";

const RecentProject = ({ projects = [], loading = false }) => {
  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <Heading size="md" weight="md">
          Recent Projects
        </Heading>

        {projects.length > 4 && (
          <Link
            to="recent-project"
            onClick={() => vibrate(12)}
            className="text-sm font-semibold px-3 py-1 flex items-center gap-1
                       border border-border-default rounded
                       hover:bg-bg-muted transition"
          >
            View All
            <span className="material-symbols-outlined">
              arrow_forward_ios
            </span>
          </Link>
        )}
      </div>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 sm:grid-cols-2 mt-1"
      >
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse border border-border-default rounded p-4 space-y-2">
              <div className="h-4 bg-bg-muted rounded w-3/4" />
              <div className="h-3 bg-bg-muted rounded w-full" />
              <div className="flex gap-2 mt-2">
                <div className="h-5 w-12 bg-bg-muted rounded-full" />
                <div className="h-5 w-12 bg-bg-muted rounded-full" />
              </div>
            </div>
          ))
        ) : projects.length > 0 ? (
          projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUpItem(30)}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => vibrate(8)}
            >
              <CardProject {...project} />
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={fadeUpItem(20)}
            transition={{ duration: 0.4 }}
            className="col-span-full flex flex-col items-center justify-center
                       border border-dashed border-border-default
                       rounded-lg py-12 text-center"
          >
            <span className="material-symbols-outlined text-4xl text-text-muted mb-3">
              work_off
            </span>

            <p className="font-semibold text-text-primary">
              No projects available
            </p>

            <p className="text-sm text-text-muted mt-1 max-w-xs">
              Projects will appear here once they are added.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default RecentProject;
