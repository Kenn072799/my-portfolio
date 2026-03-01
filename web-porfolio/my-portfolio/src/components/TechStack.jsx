import React from "react";
import Heading from "./Heading";

const TechStack = () => {
  const stacks = [
    {
      title: "Frontend",
      items: [
        "React",
        "Angular",
        "JQuery",
        "JavaScript",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      title: "Backend",
      items: ["ASP.NET Core", "Microsoft SQL Server", "Node.js", "MongoDB"],
    },
    {
      title: "Cloud and DevOps",
      items: ["Azure DevOps", "Azure Cloud", "Docker", "Kubernetes"],
    },
    {
      title: "AI / Generative AI",
      items: [
        "Azure AI Foundry",
        "Retrieval-Augmented Generation (RAG)",
        "AI Agent Architecture",
        "Prompt Engineering",
      ],
    },
  ];

  return (
    <div className="p-4 max-w-md">
      <Heading size="md" weight="md">
        Tech Stack
      </Heading>

      {stacks.map((stack) => (
        <div key={stack.title}>
          <Heading weight="md" className="py-2">
            {stack.title}
          </Heading>

          <ul className="flex flex-wrap gap-2">
            {stack.items.map((item) => (
              <li
                key={item}
                className="px-3 py-1 shadow-sm border border-border-default rounded-full text-xs font-semibold text-text-primary"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TechStack;
