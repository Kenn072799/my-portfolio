import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/common/Heading";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";
import { getCertifications } from "../api/certificationApi";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { vibrate } from "../utils/vibrate";

const RecentCertificatePage = () => {
  const navigate = useNavigate();
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getCertifications()
      .then(setCertifications)
      .catch(() => setCertifications([]))
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
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col sm:grid gap-4 sm:grid-cols-2"
      >
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse border border-border-default px-8 py-3 space-y-1">
              <div className="h-4 bg-bg-muted rounded w-2/3" />
              <div className="h-3 bg-bg-muted rounded w-1/3" />
              <div className="h-3 bg-bg-muted rounded w-full" />
            </div>
          ))
        ) : certifications.length > 0 ? (
          certifications.map((certification, index) => (
            <motion.div
              key={index}
              variants={fadeUpItem(10)}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => vibrate(8)}
              className="relative px-8 py-3 border border-border-default
                     before:absolute before:left-0 before:top-0 before:h-full before:w-3
                     before:bg-linear-to-b before:from-blue-400 before:via-blue-500 before:to-accent-main
                     hover:shadow-md transition"
            >
              <p className="font-bold truncate" title={certification.name}>
                {certification.name}
              </p>
              <p className="text-text-secondary font-semibold text-sm">
                {certification.issuer ?? certification.from}
              </p>
              <p className="text-sm text-text-secondary">
                {certification.description}
              </p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center
                          border border-dashed border-border-default
                          rounded-lg py-12 text-center">
            <span className="material-symbols-outlined text-4xl text-text-muted mb-3">
              verified_off
            </span>
            <p className="font-semibold text-text-primary">No certificates available</p>
            <p className="text-sm text-text-muted mt-1 max-w-xs">
              Certificates will appear here once they are added.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RecentCertificatePage;
