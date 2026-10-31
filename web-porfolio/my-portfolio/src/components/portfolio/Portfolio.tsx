import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Project, Experience } from '../../data/types';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { FiArrowDown, FiArrowUpRight, FiCode, FiDatabase, FiLayers, FiTerminal, FiCloud, FiCpu, FiAward, FiMail, FiMapPin } from 'react-icons/fi';
import { AiFillGithub, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai';
import portrait from '../../assets/FormalAttire1x1_dark.png';
import AnimatedImage from '../AnimatedImage';
import Navbar from './Navbar';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import { contact, projects as localProjects, skills, responsibilities, safeUrl } from '../../data/portfolio';
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const icons = [FiCode, FiDatabase, FiCloud, FiLayers, FiTerminal, FiCpu];
const socials = [
  { label: 'GitHub', url: contact.github, Icon: AiFillGithub },
  { label: 'LinkedIn', url: contact.linkedin, Icon: AiFillLinkedin },
  { label: 'Email', url: `mailto:${contact.email}`, Icon: FiMail },
  { label: 'Facebook', url: contact.facebook, Icon: AiFillFacebook },
].filter((item) => safeUrl(item.url));
function SocialLinks({ labels = false }) {
  return <div className="social-links">{socials.map(({ label, url, Icon }) => <a key={label} href={url} aria-label={label} target={label === 'Email' ? undefined : '_blank'} rel="noopener noreferrer" className={labels ? 'social-label' : 'social-icon'}><Icon />{labels && <span>{label}</span>}</a>)}</div>;
}
function Tags({ items = [] }: { items?: string[] }) { return <div className="portfolio-tags">{items.map((item) => <span key={item}>{item}</span>)}</div>; }
function SectionHeading({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return <div className="section-heading"><div><span className="section-eyebrow">{number} / {subtitle}</span><h2>{title}</h2></div><span className="heading-line" aria-hidden="true" /></div>;
}
function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} variants={stagger} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.08 }}>{children}</motion.div>;
}
function useCollectionLimit(initialCount: number, step: number, idPrefix: string) {
  const [limit, setLimit] = useState(initialCount);
  const firstNewIndex = useRef<number | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const index = firstNewIndex.current;
    if (index === null) return;
    firstNewIndex.current = null;
    const frame = requestAnimationFrame(() => {
      const card = document.getElementById(`${idPrefix}-${index}`);
      card?.focus({ preventScroll: true });
      card?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
    });
    return () => cancelAnimationFrame(frame);
  }, [limit, idPrefix, reduced]);
  function showMore() {
    firstNewIndex.current = limit;
    setLimit((current) => current + step);
  }
  return [limit, showMore] as const;
}
function Hero() {
  const reduced = useReducedMotion();
  return <section tabIndex={-1} id="home" className="hero portfolio-container">
    <motion.div className="hero-copy" variants={stagger} initial={reduced ? false : 'hidden'} animate="visible">
      <motion.div variants={fadeUp} className="role-badge"><i /> Associate Software Engineer</motion.div>
      <motion.h1 variants={fadeUp}>Hi, I’m<br /><span>Kenneth Altes.</span></motion.h1>
      <motion.p variants={fadeUp} className="hero-lead">I build scalable backend systems, automate workflows, and work with data to solve real-world problems.</motion.p>
      <motion.p variants={fadeUp} className="hero-description">Experienced in .NET, SQL Server, Azure, and system integrations, with a focus on building reliable, maintainable, and efficient solutions.</motion.p>
      <motion.div variants={stagger} className="hero-technologies">{['.NET', 'SQL Server', 'Azure', 'React', 'PowerShell'].map((tech, index) => <motion.span variants={fadeUp} key={tech}><i className={`tech-dot dot-${index}`} />{tech}</motion.span>)}</motion.div>
      <motion.div variants={fadeUp} className="hero-actions"><motion.a whileHover={reduced ? {} : { y: -3 }} whileTap={{ scale: 0.98 }} className="primary-button" href="#projects">View Projects <FiArrowUpRight /></motion.a><SocialLinks /></motion.div>
      <motion.p variants={fadeUp} className="hero-location"><FiMapPin /> Angono, Rizal · Philippines</motion.p>
    </motion.div>
    <motion.div className="portrait-stage" initial={reduced ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.35 }}>
      <div className="portrait-glow" aria-hidden="true" /><div className="portrait-orbit orbit-one" aria-hidden="true" /><div className="portrait-orbit orbit-two" aria-hidden="true" />
      <div className="portrait-frame"><AnimatedImage src={portrait} alt="Kenneth Altes wearing a dark suit and white shirt" width={1024} height={1024} priority /></div>
      <div className="code-decoration" aria-hidden="true"><FiCode /><span>engineering with purpose</span></div>
      <div className="motto-panel" aria-hidden="true"><span>01</span> Build<br /><span>02</span> Automate<br /><span>03</span> Improve<br /><span>04</span> Repeat<span className="terminal-cursor">_</span></div>
      <div className="work-panel"><div className="work-icon"><FiTerminal /></div><div><small>Currently at</small><strong>Accenture <i /></strong><p>Associate Software Engineer</p></div></div>
    </motion.div>
    <a className="scroll-cue" href="#projects"><span>Scroll to explore</span><FiArrowDown /></a>
  </section>;
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const image = safeUrl(project.imageUrl);
  const normalizedName = project.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const title = localProjects.find((item) => item.name.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedName)?.name || project.name;
  return <motion.article id={`project-card-${index}`} tabIndex={-1} variants={fadeUp} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.1 }} whileHover={reduced ? {} : { y: -6 }} className="project-card">
    {image ? <AnimatedImage key={image} src={image} alt={`${title} preview`} width={800} height={450} className="project-preview" /> : <div className={`project-cover cover-${index % 3} dot-grid`}><span className="project-cover-label">PERSONAL PROJECT / {String(index + 1).padStart(2, '0')}</span><FiCode aria-hidden="true" /><span className="project-cover-name">{title}</span></div>}
    <div className="project-content"><div className="project-title"><h3>{title}</h3></div><p>{project.description}</p><Tags items={project.technologies} /><div className="project-links">
      {safeUrl(project.repositoryUrl) && <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} GitHub repository`}><AiFillGithub /> GitHub <FiArrowUpRight /></a>}
      {safeUrl(project.demoUrl) && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo`}>Live Demo <FiArrowUpRight /></a>}
    </div></div>
  </motion.article>;
}
function dateLabel(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
export default function Portfolio() {
  const { projects, experiences, stacks, certifications, loaded, pendingKeys, errors, reload } = usePortfolioData();
  const [projectLimit, showMoreProjects] = useCollectionLimit(3, 3, 'project-card');
  const [certificateLimit, showMoreCertificates] = useCollectionLimit(4, 4, 'certificate-card');
  const reduced = useReducedMotion();
  const allProjects = loaded.projects ? projects : localProjects;
  const certificates: import("../../data/types").Certification[] = certifications;
  const jobs: Experience[] = loaded.experiences ? experiences : [{ id: 'accenture', title: 'Associate Software Engineer', company: 'Accenture' }];
  const displayedSkills = loaded.stacks ? stacks : skills;
  return <MotionConfig reducedMotion="user"><div className="portfolio-site"><a href="#main-content" className="skip-link">Skip to content</a><Navbar />
    <main id="main-content" tabIndex={-1}><Hero /><div className="portfolio-container">{Object.keys(errors).length > 0 && <div className="portfolio-data-notice" role="status"><span>Some live portfolio content is unavailable. Saved content is shown where available.</span><button type="button" onClick={reload}>Try again</button></div>}
      <section tabIndex={-1} id="projects" className="portfolio-section"><SectionHeading number="01" subtitle="SELECTED WORK" title="Selected Projects" /><div id="project-collection">{loaded.projects && allProjects.length === 0 && <p className="collection-empty">No projects have been published yet.</p>}<div className="projects-grid">{allProjects.slice(0, projectLimit).map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div></div><div className="collection-controls"><p>Showing {Math.min(projectLimit, allProjects.length)} of {allProjects.length} projects</p>{projectLimit < allProjects.length && <button type="button" className="outline-button" aria-controls="project-collection" onClick={showMoreProjects}>View more projects <FiArrowDown /></button>}<span className="sr-only" role="status">{Math.min(projectLimit, allProjects.length)} projects displayed</span></div></section>
      <section tabIndex={-1} id="experience" className="portfolio-section"><SectionHeading number="02" subtitle="THE JOURNEY" title="Experience & Background" />{loaded.experiences && jobs.length === 0 && <p className="collection-empty">No background records have been published yet.</p>}<Reveal className="experience-grid"><motion.div variants={fadeUp} className="experience-jobs">{jobs.map((job) => <article className="timeline-job" key={job.id}><span className="timeline-dot" /><span className="section-eyebrow">{/bachelor|master|degree|diploma|university/i.test(job.title) ? 'EDUCATION' : job.current ? 'CURRENT ROLE' : 'BACKGROUND'}</span><h3>{job.title}</h3><strong>{job.company}</strong>{dateLabel(job.startDate) && <p className="job-dates">{dateLabel(job.startDate)}{job.current ? ' — Present' : dateLabel(job.endDate) ? ` — ${dateLabel(job.endDate)}` : ''}</p>}{job.location && <p className="job-location">{job.location}</p>}{job.description && <p className="job-description">{job.description}</p>}{job.technologies?.length ? <Tags items={job.technologies} /> : null}</article>)}</motion.div><motion.div variants={fadeUp} className="responsibilities"><div className="panel-label"><FiTerminal /> WHAT I WORK ON</div><ul>{responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></motion.div></Reveal></section>
      <section tabIndex={-1} id="skills" className="portfolio-section"><SectionHeading number="03" subtitle="MY TOOLKIT" title="Technical Skills" />{loaded.stacks && displayedSkills.length === 0 && <p className="collection-empty">No skills have been published yet.</p>}<Reveal className="skills-grid">{displayedSkills.map((group, index) => { const Icon = icons[index % icons.length]; return <motion.article variants={fadeUp} key={group.title} className="skill-card"><Icon className="skill-icon" /><h3>{group.title}</h3><p className="skill-context">{group.context}</p><Tags items={group.items} /></motion.article>; })}</Reveal></section>
      <section tabIndex={-1} id="certifications" className="portfolio-section"><SectionHeading number="04" subtitle="ALWAYS LEARNING" title="Certifications & Learning" /><div id="certificate-collection" aria-busy={pendingKeys.includes("certifications")} >{loaded.certifications && !pendingKeys.includes("certifications") && certificates.length === 0 && <p className="collection-empty">No certificates have been published yet.</p>}{!loaded.certifications && pendingKeys.includes("certifications") && <div className="certifications-grid" role="status" aria-label="Loading certificates">{Array.from({ length: 4 }, (_, index) => <div key={index} className="certificate-card collection-skeleton" aria-hidden="true" />)}<span className="sr-only">Loading your certificates…</span></div>}{!loaded.certifications && !pendingKeys.includes("certifications") && <div className="portfolio-data-notice"><span>Your certificates could not be loaded. Please try again.</span><button type="button" onClick={reload}>Retry certificates</button></div>}<div className="certifications-grid">{certificates.slice(0, certificateLimit).map((cert, index) => <motion.article id={`certificate-card-${index}`} tabIndex={-1} variants={fadeUp} initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.1 }} key={cert.id} className="certificate-card"><div className="certificate-icon"><FiAward /></div><div><span className="section-eyebrow">{cert.kind || (cert.issuer?.toLowerCase() === 'udemy' ? 'Course completion' : 'Credential')}</span><h3>{cert.name}</h3><p>{cert.issuer}{dateLabel(cert.issueDate) && ` · ${dateLabel(cert.issueDate)}`}</p>{cert.description && <p>{cert.description}</p>}{safeUrl(cert.credentialUrl) && <a className="text-link" href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">View credential <FiArrowUpRight /></a>}</div></motion.article>)}</div></div><div className="collection-controls"><p>{!loaded.certifications ? (pendingKeys.includes("certifications") ? "Loading your certificates…" : "Certificates unavailable") : `Showing ${Math.min(certificateLimit, certificates.length)} of ${certificates.length} certificates`}</p>{certificateLimit < certificates.length && <button type="button" className="outline-button" aria-controls="certificate-collection" onClick={showMoreCertificates}>View more certificates <FiArrowDown /></button>}<span className="sr-only" role="status">{Math.min(certificateLimit, certificates.length)} certificates displayed</span></div></section>
      <section tabIndex={-1} id="contact" className="portfolio-section contact-section"><Reveal><motion.div variants={fadeUp} className="contact-panel"><span className="section-eyebrow">05 / LET’S CONNECT</span><div className="contact-spark" aria-hidden="true">✳</div><h2>Let’s build something<br /><span>meaningful.</span></h2><p>I’m open to connecting with developers, discussing technology, and exploring software engineering opportunities.</p><a className="primary-button" href={`mailto:${contact.email}`}>Let’s Talk <FiArrowUpRight /></a><SocialLinks labels /></motion.div></Reveal></section>
    </div></main><footer className="portfolio-footer portfolio-container"><a className="brand" href="#home"><strong>KA<span>.</span></strong></a><p>© {new Date().getFullYear()} Kenneth Altes</p><a href="#home">Back to top ↑</a></footer>
  </div></MotionConfig>;
}

