export const contact = {
  email: import.meta.env.VITE_EMAIL || 'kennethaltes27@gmail.com',
  github: import.meta.env.VITE_GITHUB_URL,
  linkedin: import.meta.env.VITE_LINKEDIN_URL,
  facebook: import.meta.env.VITE_FACEBOOK_URL,
};
/** @type {import('./types').Project[]} */
export const projects = [
  { id: 'quiz', name: 'AI Quiz Generator', description: 'Upload study materials and generate AI-powered quizzes and flashcards to support learning.', technologies: ['React', 'Tailwind CSS', 'ASP.NET Core', 'PostgreSQL', 'Motion for React'] },
  { id: 'uptime', name: 'Uptime Monitor', description: 'A developer uptime monitoring tool that checks services, tracks response times, and sends alerts when services become unavailable.', technologies: ['React', 'ASP.NET Core', 'PostgreSQL', 'Tailwind CSS'] },
  { id: 'prompt', name: 'AI Prompt Helper', description: 'Analyze, score, and improve AI prompts using structured prompt engineering techniques.', technologies: ['React', 'ASP.NET Core', 'PostgreSQL', 'Neon Serverless', 'Groq API'] },
];
export const certifications = [
  { id: 'docker', name: 'Docker for the Absolute Beginner', issuer: 'Udemy', kind: 'Course completion' },
  { id: 'spring', name: 'Spring Boot 3, Spring 6 & Hibernate for Beginners', issuer: 'Udemy', kind: 'Course completion' },
];
/** @type {import('./types').SkillGroup[]} */
export const skills = [
  { title: 'Backend Development', context: 'Professional & project experience', items: ['C#', 'ASP.NET Core Web API', 'REST APIs', 'T-SQL', 'Stored Procedures'] },
  { title: 'Database & Data Processing', context: 'Professional & project experience', items: ['Microsoft SQL Server', 'SSMS', 'PostgreSQL', 'Data Validation', 'XML / XSLT'] },
  { title: 'Cloud & DevOps', context: 'Professional experience & learning', items: ['Microsoft Azure', 'Azure DevOps', 'CI/CD', 'PowerShell', 'Git', 'Docker'] },
  { title: 'Frontend', context: 'Personal projects', items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { title: 'Enterprise Engineering', context: 'Professional experience', items: ['Root Cause Analysis', 'Production Support', 'System Integration', 'SQL Troubleshooting', 'Batch Processing', 'QA / UAT'] },
  { title: 'AI & Emerging Technologies', context: 'Personal projects & learning', items: ['Generative AI', 'Retrieval-Augmented Generation', 'Prompt Engineering', 'Azure AI Search'] },
];
export const responsibilities = [
  'SQL Server & stored procedure development',
  'Support enterprise applications through data validation, root cause analysis, and defect investigation.',
  'Work on inbound and outbound system integrations and XML / XSLT data transformations.',
  'PowerShell scripting & workflow automation'
];
export function safeUrl(value) {
  if (!value || /your-|example\.com|undefined/i.test(value)) return undefined;
  try { return ['https:', 'http:', 'mailto:'].includes(new URL(value).protocol) ? value : undefined; }
  catch { return undefined; }
}
