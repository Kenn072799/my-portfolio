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
    <section className="p-4 flex-1">
      <Heading size="md" weight="md" className="mb-4">
        Experience
      </Heading>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-px bg-border-default" />

        <ul className="space-y-8">
          {experiences.map((experience, index) => (
            <li key={index} className="relative pl-8 flex gap-4">
              {/* Dot */}
              <span
                className={`mt-1 w-3 h-3 rounded-full shrink-0
              ${
                experience.current
                  ? "bg-text-primary"
                  : "bg-white border-2 border-border-default"
              }`}
              />

              {/* Horizontal connector */}
              <span className="absolute left-2 top-2 w-4 h-px bg-border-default" />

              {/* Content */}
              <div className="text-sm w-full">
                <p className="font-bold leading-snug">{experience.title}</p>

                {/* Company + Year (FIXED ALIGNMENT) */}
                <div className="grid grid-cols-[1fr_auto] items-center gap-4 text-text-muted text-xs">
                  <p className="font-semibold">{experience.company}</p>
                  <p className="whitespace-nowrap text-right">
                    {experience.year}
                  </p>
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
