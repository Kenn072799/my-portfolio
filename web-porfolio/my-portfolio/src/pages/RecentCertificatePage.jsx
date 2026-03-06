import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/common/Heading";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { vibrate } from "../utils/vibrate";
import { getCertifications } from "../api/certificationApi";

const RecentCertificatePage = () => {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getCertifications()
      .then(setCertifications)
      .catch(() => setError("Failed to load certifications."))
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
          All Recent Certifications
        </Heading>
      </div>
      {loading && (
        <div className="flex flex-col gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="relative px-8 py-3 border border-border-default
                 flex flex-col gap-2 animate-pulse"
            >
              <div className="absolute left-0 top-0 h-full w-3 bg-bg-muted" />
              <div className="h-4 w-48 rounded bg-bg-muted" />
              <div className="h-3 w-32 rounded bg-bg-muted" />
              <div className="h-3 w-3/4 rounded bg-bg-muted" />
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

      {!loading && !error && certifications.length === 0 && (
        <motion.div
          variants={fadeUpItem(20)}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center
                    border border-dashed border-border-default
                    rounded-lg py-12 text-center mt-1"
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

      {!loading && !error && certifications.length > 0 && (
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-4"
        >
          {certifications.map((certification, index) => {
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
                key={certification.id ?? index}
                variants={fadeUpItem(10)}
                transition={{ duration: 0.35, ease: "easeOut" }}
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
          })}
        </motion.div>
      )}
    </div>
  );
};

export default RecentCertificatePage;
