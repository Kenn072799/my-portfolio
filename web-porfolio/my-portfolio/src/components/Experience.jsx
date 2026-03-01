import React from "react";
import Heading from "./Heading";

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
        <div className="absolute left-1.5 top-0 bottom-0 w-px bg-border-default" />

        <ul className="space-y-6">
          {experiences.map((experience, index) => (
            <li key={index} className="relative pl-8">
              {/* Dot */}
              <span
                className={`absolute left-0 top-1.5 w-3 h-3
                  ${
                    experience.current
                      ? "bg-text-primary rounded-full ring-2 ring-offset-2"
                      : "bg-white border-border-default rounded-full border-2 "
                  }`}
              />
              {/* Content */}
              <div className="text-sm">
                <p className="font-bold">{experience.title}</p>
                <div className="flex justify-between text-text-muted text-xs">
                  <p className="font-semibold">{experience.company}</p>
                  <p>{experience.year}</p>
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
