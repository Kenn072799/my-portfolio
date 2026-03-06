import { useState, useEffect } from "react";
import { getProjects } from "../api/projectApi";
import { getSkills } from "../api/skillApi";
import { getExperiences } from "../api/experienceApi";
import { getCertifications } from "../api/certificationApi";

const groupSkills = (skills) =>
  Object.values(
    skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = { title: skill.category, items: [] };
      }
      acc[skill.category].items.push(skill.name);
      return acc;
    }, {}),
  );

export const usePortfolioData = () => {
  const [data, setData] = useState({
    projects: [],
    stacks: [],
    experiences: [],
    certifications: [],
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadAll = async () => {
      const [projects, skills, experiences, certifications] =
        await Promise.allSettled([
          getProjects(),
          getSkills(),
          getExperiences(),
          getCertifications(),
        ]);

      setData({
        projects: projects.status === "fulfilled" ? projects.value : [],
        stacks: skills.status === "fulfilled" ? groupSkills(skills.value) : [],
        experiences:
          experiences.status === "fulfilled" ? experiences.value : [],
        certifications:
          certifications.status === "fulfilled" ? certifications.value : [],
      });

      setErrors({
        ...(projects.status === "rejected" && {
          projects: "Unable to load projects",
        }),
        ...(skills.status === "rejected" && {
          stacks: "Unable to load tech stack",
        }),
        ...(experiences.status === "rejected" && {
          experiences: "Unable to load experience",
        }),
        ...(certifications.status === "rejected" && {
          certifications: "Unable to load certifications",
        }),
      });

      setLoading(false);
    };

    loadAll();
  }, []);

  return { ...data, loading, errors };
};
