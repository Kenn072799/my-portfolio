import { NavLink, Link } from 'react-router-dom';
import { FiGrid, FiCode, FiLayers, FiBriefcase, FiAward, FiBarChart2, FiArrowUpRight } from 'react-icons/fi';
const items = [
  ['Overview', '/admin/dashboard', FiGrid], ['Projects', '/admin/projects', FiCode],
  ['Skills', '/admin/skills', FiLayers], ['Experience', '/admin/experience', FiBriefcase],
  ['Certificates', '/admin/certifications', FiAward], ['Analytics', '/admin/analytics', FiBarChart2],
];
export default function Sidebar({ onNavigate }) {
  return <aside className="admin-sidebar"><Link className="admin-brand" to="/" onClick={onNavigate}><strong>KA<span>.</span></strong><div>Kenneth Altes<small>PORTFOLIO STUDIO</small></div></Link>
    <div className="admin-nav-label">WORKSPACE</div><nav aria-label="Admin navigation">{items.map(([label, path, Icon]) => <NavLink key={path} to={path} onClick={onNavigate} className={({ isActive }) => isActive ? 'is-active' : ''}><Icon /><span>{label}</span></NavLink>)}</nav>
    <div className="admin-sidebar-footer"><Link to="/" onClick={onNavigate}>View portfolio <FiArrowUpRight /></Link><small>Content, thoughtfully managed.</small></div>
  </aside>;
}
