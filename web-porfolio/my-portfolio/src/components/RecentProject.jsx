import React from "react";
import Heading from "./common/Heading";
import CardProject from "./card/project/CardProject";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { vibrate } from "../utils/vibrate";

const RecentProject = ({ projects, loading, error }) => {
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
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </Link>
        )}
      </div>

      <div className="grid gap-4 mt-1">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-full p-4 border border-border-default
                   flex flex-col space-y-3 animate-pulse"
            >
              {/* Title */}
              <div className="h-4 w-40 rounded bg-bg-muted" />

              {/* Description */}
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-bg-muted" />
                <div className="h-3 w-3/4 rounded bg-bg-muted" />
              </div>

              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-5 w-12 rounded bg-bg-muted" />
                <div className="h-5 w-16 rounded bg-bg-muted" />
                <div className="h-5 w-10 rounded bg-bg-muted" />
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Link */}
              <div className="h-6 w-24 rounded bg-bg-muted" />
            </div>
          ))
        ) : error ? (
          <p className="col-span-full text-sm text-red-500">{error}</p>
        ) : projects.length > 0 ? (
          projects.slice(0, 4).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.12 }}
              onClick={() => vibrate(8)}
            >
              <CardProject
                name={project.name}
                description={project.description}
                repoUrl={project.repositoryUrl}
                demoUrl={project.demoUrl}
                tags={project.technologies ?? []}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="col-span-full flex flex-col items-center justify-center
                 border border-dashed border-border-default
                 rounded-lg py-12 text-center"
          >
            <span className="material-symbols-outlined text-4xl text-text-muted mb-3 work_off">
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
      </div>
    </section>
  );
};

export default RecentProject;
