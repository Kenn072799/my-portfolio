import React from "react";
import Heading from "../../common/Heading";
import { FaGithub } from "react-icons/fa";

const CardProject = ({ name, description, repoUrl, demoUrl, tags = [] }) => {
  return (
    <div
      className="p-4 border border-border-default
             flex flex-col space-y-1
             transition-all duration-200
             hover:shadow-md hover:bg-bg-muted/40"
    >
      {/* Title */}
      <Heading as="h3" weight="md" className="line-clamp-1">
        {name}
      </Heading>

      {/* Description */}
      <p className="text-sm line-clamp-2 text-text-secondary">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
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

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono
                       border border-border-default bg-bg-muted
                       hover:bg-bg-main hover:border-text-primary
                       transition-all duration-150"
          >
            <FaGithub
              size={14}
              className="group-hover:scale-110 transition-transform"
            />
            GitHub
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono
                       border border-border-default bg-bg-muted
                       hover:bg-bg-main hover:border-text-primary
                       transition-all duration-150"
          >
            <span
              className="material-symbols-outlined group-hover:scale-110 transition-transform"
              style={{ fontSize: 13 }}
            >
              open_in_new
            </span>
            Live Demo
          </a>
        )}
        {!repoUrl && !demoUrl && (
          <span className="text-xs font-mono text-text-muted px-3 py-1 border border-border-default bg-bg-muted">
            No links
          </span>
        )}
      </div>
    </div>
  );
};

export default CardProject;
