import React from "react";
import Heading from "./common/Heading";

const certifications = [
  {
    name: "Azure Fundamentals (AZ-900)",
    from: "Microsoft",
    description: "Cloud concepts and Azure services.",
  },
  {
    name: "AWS Cloud Practitioner",
    from: "Amazon Web Services",
    description: "Core AWS cloud knowledge.",
  },
  {
    name: "Responsive Web Design",
    from: "freeCodeCamp",
    description: "HTML and CSS fundamentals.",
  },
  {
    name: "Java Programming Certificate",
    from: "Oracle",
    description: "Java basics and OOP concepts.",
  },
  {
    name: "Azure Fundamentals (AZ-900)",
    from: "Microsoft",
    description: "Cloud concepts and Azure services.",
  },
  {
    name: "AWS Cloud Practitioner",
    from: "Amazon Web Services",
    description: "Core AWS cloud knowledge.",
  },
  {
    name: "Responsive Web Design",
    from: "freeCodeCamp",
    description: "HTML and CSS fundamentals.",
  },
  {
    name: "Java Programming Certificate",
    from: "Oracle",
    description: "Java basics and OOP concepts.",
  },
];

const RecentCertification = () => {
  return (
    <section className="max-w-4xl mx-auto p-4 border-b border-border-default">
      <div className="flex items-center justify-between mb-4">
        <Heading size="md" weight="md">
          Recent Certifications
        </Heading>

        {certifications.length > 4 && (
          <button
            className="text-sm font-semibold px-3 py-1 flex items-center gap-1
                   border border-border-default rounded
                   hover:bg-gray-100 transition"
          >
            View All
            <span className="material-symbols-outlined text-xs">
              arrow_forward_ios
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {certifications.slice(0, 4).map((certification, index) => (
          <div
            key={index}
            className="relative px-8 py-3 border border-border-default
                   before:absolute before:left-0 before:top-0 before:h-full before:w-3
                   before:bg-gradient-to-b before:from-yellow-400 before:via-yellow-500 before:to-amber-600
                   hover:shadow-md transition"
          >
            <p className="font-bold">{certification.name}</p>
            <p className="text-text-secondary font-semibold text-sm">
              {certification.from}
            </p>
            <p className="text-sm text-text-secondary">
              {certification.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentCertification;
