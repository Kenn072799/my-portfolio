import React from "react";
import Heading from "../../common/Heading";

const CardProject = ({ name, description, link, linkName, tags = [] }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="h-full">
      <div
        className="h-full p-4 border border-border-default
               flex flex-col space-y-3 cursor-pointer
               transition-all duration-200
               hover:shadow-md hover:bg-bg-muted/40"
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
              className="px-2 py-0.5 text-xs font-mono rounded
                     border border-border-default
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
