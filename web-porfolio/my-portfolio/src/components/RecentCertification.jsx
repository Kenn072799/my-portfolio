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
            className="text-sm font-semibold cursor-pointer px-2 py-1 flex items-center gap-1
          hover:bg-gray-100 active:bg-gray-200 active:translate-x-1 duration-200 "
          >
            View All
            <span className="material-symbols-outlined arrow">
              arrow_forward_ios
            </span>
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-col">
        {certifications.slice(0, 4).map((certification, index) => {
          return (
            <div
              key={index}
              className="relative px-8 py-2 border border-border-default
             before:absolute before:left-0 before:top-0 before:h-full before:w-4
             before:bg-linear-to-b before:from-yellow-400 before:via-yellow-500 before:to-amber-600 
             hover:-translate-y-1 duration-200 hover:shadow-md"
            >
              <p className="font-bold whitespace-nowrap">
                {certification.name}
              </p>
              <p className="whitespace-nowrap text-text-secondary font-semibold text-sm">
                {certification.from}
              </p>
              <p className="whitespace-nowrap text-sm text-text-secondary">
                {certification.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentCertification;
