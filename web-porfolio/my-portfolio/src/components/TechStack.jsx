import React from "react";
import Heading from "./common/Heading";

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
        "Azure AI",
        "Retrieval-Augmented Generation (RAG)",
        "AI Agent Architecture",
        "Prompt Engineering",
      ],
    },
    {
      title: "Development Tools",
      items: [
        "Visual Studio",
        "Visual Studio Code",
        "Git",
        "Postman",
        "Swagger",
        "IntelliJ IDEA",
        "Microsoft SQL Server Management Studio (SSMS)",
      ],
    },
  ];

  return (
    <section className="p-4 rounded-md bg-bg-muted/30">
      <Heading size="md" weight="md" className="mb-4">
        Tech Stack
      </Heading>

      {stacks.map((stack) => (
        <div key={stack.title} className="mb-4">
          <Heading weight="md" className="mb-2 text-sm">
            {stack.title}
          </Heading>

          <ul className="flex flex-wrap gap-2">
            {stack.items.map((item) => (
              <li
                key={item}
                className="px-3 py-1 rounded-full text-xs font-semibold
                           border border-border-default bg-white
                           text-text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default TechStack;
