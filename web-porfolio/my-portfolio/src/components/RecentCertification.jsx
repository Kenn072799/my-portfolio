import React from "react";
import Heading from "./common/Heading";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { vibrate } from "../utils/vibrate";

const RecentCertification = ({ certifications, loading, error }) => {
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
                   hover:bg-bg-muted transition"
          >
            View All
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="relative px-8 py-3 border border-border-default
                 flex flex-col gap-2 animate-pulse"
            >
              {/* Left accent placeholder */}
              <div className="absolute left-0 top-0 h-full w-3 bg-bg-muted" />

              {/* Title */}
              <div className="h-4 w-48 rounded bg-bg-muted" />

              {/* Issuer */}
              <div className="h-3 w-32 rounded bg-bg-muted" />

              {/* Description */}
              <div className="h-3 w-3/4 rounded bg-bg-muted" />
            </div>
          ))
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : certifications.length > 0 ? (
          certifications.slice(0, 4).map((certification, i) => {
            const Tag = certification.credentialUrl ? "a" : "div";
            const linkProps = certification.credentialUrl
              ? {
                  href: certification.credentialUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <motion.div
                key={certification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                  delay: i * 0.08,
                }}
              >
                <Tag
                  {...linkProps}
                  onClick={() => vibrate(8)}
                  className={`relative px-8 py-3 border border-border-default
before:absolute before:left-0 before:top-0 before:h-full before:w-3
before:bg-linear-to-b before:from-blue-400 before:via-blue-500 before:to-accent-main
hover:shadow-md transition block
${certification.credentialUrl ? "cursor-pointer" : ""}`}
                >
                  <p className="font-bold truncate" title={certification.name}>
                    {certification.name}
                  </p>
                  <p className="text-text-secondary font-semibold text-sm">
                    {certification.issuer}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {certification.description}
                  </p>
                </Tag>
              </motion.div>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center
                      border border-dashed border-border-default
                      rounded-lg py-12 text-center"
          >
            <span className="material-symbols-outlined text-4xl text-text-muted mb-3 verified_off">
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
      </div>
    </section>
  );
};

export default RecentCertification;
