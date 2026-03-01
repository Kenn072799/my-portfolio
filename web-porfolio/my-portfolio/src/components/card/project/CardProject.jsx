import React from "react";
import Heading from "../../common/Heading";

const CardProject = ({ name, description, link, linkName, tags = [] }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="h-full">
      <div
        className="h-full p-4 shadow-sm hover:-translate-y-1 duration-200 hover:shadow-md cursor-pointer
                      flex flex-col space-y-3"
      >
        {/* Title */}
        <Heading as="h3" weight="md" className="line-clamp-2">
          {name}
        </Heading>

        {/* Description */}
        <p className="font-semibold text-sm line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs font-mono rounded shadow font-semibold
                         bg-bg-muted text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Link */}
        <p className="bg-bg-muted px-3 py-1 text-sm font-mono inline-block self-start">
          {linkName}
        </p>
      </div>
    </a>
  );
};

export default CardProject;
