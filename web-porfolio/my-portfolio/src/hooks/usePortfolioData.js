import { useState, useEffect } from 'react';
import { getProjects } from '../api/projectApi';
import { getSkills } from '../api/skillApi';
import { getExperiences } from '../api/experienceApi';
import { getCertifications } from '../api/certificationApi';
import { readSnapshot, saveSnapshot, loadCollection } from './portfolioCache';

const groupSkills = (skills) => Object.values(skills.reduce((groups, skill) => {
  const category = skill.category || 'Additional technologies';
  if (!groups[category]) groups[category] = { title: category, items: [] };
  groups[category].items.push(skill.name);
  return groups;
}, {}));

export const usePortfolioData = () => {
  const [snapshot] = useState(readSnapshot);
  const [data, setData] = useState(/** @type {{ projects: import('../data/types').Project[], stacks: import('../data/types').SkillGroup[], experiences: import('../data/types').Experience[], certifications: import('../data/types').Certification[] }} */ ({ projects: [], stacks: [], experiences: [], certifications: [], ...snapshot }));
  const [loaded, setLoaded] = useState(/** @type {Record<string, boolean>} */ (Object.fromEntries(Object.keys(snapshot).map((key) => [key, true]))));
  const [pendingKeys, setPendingKeys] = useState(['projects', 'stacks', 'experiences', 'certifications']);
  const [attempt, setAttempt] = useState(0);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    let active = true;
    const endpoints = [
      ['projects', getProjects], ['stacks', getSkills],
      ['experiences', getExperiences], ['certifications', getCertifications],
    ];
    endpoints.forEach(async ([key, fetchData]) => {
      try {
        const result = await loadCollection(key, fetchData);
        const records = key === 'stacks' ? groupSkills(result) : result;
        saveSnapshot(key, records);
        if (active) {
          setData((previous) => ({ ...previous, [key]: records }));
          setLoaded((previous) => ({ ...previous, [key]: true }));
        }
      } catch {
        if (active) setErrors((previous) => ({ ...previous, [key]: `Unable to load ${key}` }));
      } finally {
        if (active) setPendingKeys((previous) => previous.filter((item) => item !== key));
      }
    });
    return () => { active = false; };
  }, [attempt]);
  return { ...data, loaded, pendingKeys, loading: pendingKeys.length > 0, errors, reload: () => {
    setErrors({}); setPendingKeys(['projects', 'stacks', 'experiences', 'certifications']); setAttempt((value) => value + 1);
  } };
};
