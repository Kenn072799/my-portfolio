import React from "react";
import Heading from "./common/Heading";

const experiences = [
  {
    title: "Associate Software Engineer",
    company: "Accenture Philippines",
    year: "2025",
    current: true,
  },
  {
    title: "BS Information Technology",
    company: "STI College Ortigas-Cainta",
    year: "2025",
    current: false,
  },
];

const Experience = () => {
  return (
    <section className="p-4 space-y-4 flex-1">
      <Heading size="md" weight="md">
        Experience
      </Heading>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1.5 top-1 bottom-0 w-px bg-border-default" />

        <ul className="space-y-6">
          {experiences.map((experience, index) => (
            <li key={index} className="relative pl-8">
              {/* Dot */}
              <span
                className={`absolute  top-1 w-3 h-3 left-0
      ${
        experience.current
          ? "bg-text-primary left-0"
          : "bg-white border-border-default border-2"
      }`}
              />

              {/* Horizontal line */}
              <span className="absolute left-3 top-2.25 w-4 -z-10 h-px bg-border-default" />

              {/* Content */}
              <div className="text-sm">
                <p className="font-bold">{experience.title}</p>

                <div className="flex justify-between text-text-muted text-xs">
                  <p className="font-semibold">{experience.company}</p>
                  <p className="whitespace-nowrap">{experience.year}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
