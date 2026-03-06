import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/common/Heading";
import CardProject from "../components/card/project/CardProject";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";
import { getProjects } from "../api/projectApi";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { vibrate } from "../utils/vibrate";

const RecentProjectPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
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
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 sm:grid-cols-2 mt-1"
      >
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
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
          projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUpItem(10)}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => vibrate(8)}
            >
              <CardProject {...project} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center
                          border border-dashed border-border-default
                          rounded-lg py-12 text-center">
            <span className="material-symbols-outlined text-4xl text-text-muted mb-3">
              work_off
            </span>
            <p className="font-semibold text-text-primary">No projects available</p>
            <p className="text-sm text-text-muted mt-1 max-w-xs">
              Projects will appear here once they are added.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RecentProjectPage;
