import { FiUsers, FiMessageSquare, FiCode, FiBarChart2, FiGlobe } from 'react-icons/fi';
export default function StatCard({ title, value, sub, color = 'blue' }) {
  const Icon = /project/i.test(title) ? FiCode : /today/i.test(title) ? FiGlobe : /visitor/i.test(title) ? FiUsers : /question|chat/i.test(title) ? FiMessageSquare : FiBarChart2;
  return <article className={`admin-stat accent-${color}`}><div className="admin-stat-heading"><span>{title}</span><Icon /></div><strong>{value ?? '—'}</strong>{sub && <p>{sub}</p>}</article>;
}
