import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCode, FiLayers, FiBriefcase, FiAward, FiBarChart2 } from 'react-icons/fi';
import { getAnalyticsSummary } from '../api/analyticsApi';
import { getProjects } from '../api/projectApi';
import StatCard from '../components/StatCard';
import SkeletonCard from '../components/SkeletonCard';
import PageHeader from '../components/PageHeader';
const shortcuts = [
  ['Projects', 'Show what you have built.', '/admin/projects', FiCode],
  ['Skills', 'Keep your toolkit current.', '/admin/skills', FiLayers],
  ['Experience', 'Tell your professional story.', '/admin/experience', FiBriefcase],
  ['Certificates', 'Document your learning.', '/admin/certifications', FiAward],
  ['Analytics', 'Understand portfolio activity.', '/admin/analytics', FiBarChart2],
];
export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [projectCount, setProjectCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [analytics, projects] = await Promise.all([getAnalyticsSummary(), getProjects({ page: 1, pageSize: 1 })]);
        if (active) { setSummary(analytics); setProjectCount(projects.totalCount); }
      } catch { if (active) setError('Unable to load your dashboard. Check the API connection and try again.'); }
      finally { if (active) setLoading(false); }
    }
    load(); return () => { active = false; };
  }, [attempt]);
  return <><PageHeader title="Your portfolio, at a glance." description="A little perspective on your work and the people discovering it." />{error ? <div className="admin-error" role="alert">{error}<button className="admin-secondary" onClick={() => { setError(''); setLoading(true); setAttempt((value) => value + 1); }}>Try again</button></div> : <div className="admin-stat-grid">{loading ? <SkeletonCard count={4} /> : <><StatCard title="Total Visitors" value={summary?.totalVisitors} /><StatCard title="AI Questions Asked" value={summary?.totalChatMessages} color="purple" /><StatCard title="Total Projects" value={projectCount} color="green" /><StatCard title="Top Question" value={summary?.topQuestionCount} sub={summary?.topQuestion || 'No questions yet'} color="orange" /></>}</div>}<section className="admin-shortcuts"><div className="admin-section-heading"><span className="admin-eyebrow">MAKE IT YOURS</span><h2>Keep your story moving.</h2></div><div className="admin-shortcut-grid">{shortcuts.map(([label, description, path, Icon]) => <Link to={path} key={path}><Icon /><h3>{label}</h3><p>{description}</p><FiArrowUpRight className="shortcut-arrow" /></Link>)}</div></section></>;
}
