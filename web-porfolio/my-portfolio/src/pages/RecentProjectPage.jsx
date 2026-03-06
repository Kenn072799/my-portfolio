import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/common/Heading";
import CardProject from "../components/card/project/CardProject";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { vibrate } from "../utils/vibrate";
import { getProjects } from "../api/projectApi";

const getLinkName = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const RecentProjectPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getProjects()
      .then(setProjects)
      .catch(() => setError("Failed to load projects."))
      .finally(() => setLoading(false));
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
        hover:bg-bg-muted transition cursor-pointer"
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
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 mt-1">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-full p-4 border border-border-default
                   flex flex-col space-y-3 animate-pulse"
            >
              <div className="h-4 w-40 rounded bg-bg-muted" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-bg-muted" />
                <div className="h-3 w-3/4 rounded bg-bg-muted" />
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-12 rounded bg-bg-muted" />
                <div className="h-5 w-16 rounded bg-bg-muted" />
                <div className="h-5 w-10 rounded bg-bg-muted" />
              </div>
              <div className="flex-1" />
              <div className="h-6 w-24 rounded bg-bg-muted" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      {!loading && !error && projects.length === 0 && (
        <motion.div
          variants={fadeUpItem(20)}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4 }}
          className="col-span-full flex flex-col items-center justify-center
               border border-dashed border-border-default
               rounded-lg py-12 text-center mt-1"
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

      {!loading && !error && projects.length > 0 && (
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 mt-1"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id ?? index}
              variants={fadeUpItem(10)}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => vibrate(8)}
            >
              <CardProject
                name={project.name}
                description={project.description}
                link={project.demoUrl || project.repositoryUrl || "#"}
                linkName={
                  getLinkName(project.demoUrl || project.repositoryUrl || "") ||
                  "View Project"
                }
                tags={
                  Array.isArray(project.technologies)
                    ? project.technologies
                    : []
                }
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default RecentProjectPage;
