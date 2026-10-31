import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiArrowUpRight } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import { logout } from '../auth';
const titles = { dashboard: 'Overview', projects: 'Projects', skills: 'Skills', experience: 'Experience', certifications: 'Certificates', analytics: 'Analytics' };
export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef(null);
  const sidebar = useRef(null);
  const title = titles[pathname.split('/').pop()] || 'Overview';
  useEffect(() => {
    document.getElementById('admin-content')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 801px)');
    function closeOnDesktop() { if (desktop.matches) setMenuOpen(false); }
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    sidebar.current?.querySelector('a')?.focus();
    function keyboard(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        requestAnimationFrame(() => toggle.current?.focus());
      }
      if (event.key === 'Tab') {
        const controls = sidebar.current?.querySelectorAll('a[href], button:not([disabled])');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !sidebar.current.contains(document.activeElement))) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }
    }
    document.addEventListener('keydown', keyboard);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keyboard); };
  }, [menuOpen]);
  return <div className={`admin-theme admin-shell ${menuOpen ? 'menu-open' : ''}`}>
    <a className="skip-link" href="#admin-content">Skip to workspace</a>{menuOpen && <button className="admin-menu-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <div ref={sidebar} id="admin-navigation" className="admin-sidebar-wrap" role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen ? true : undefined} aria-label={menuOpen ? "Admin navigation" : undefined}><Sidebar onNavigate={() => setMenuOpen(false)} /></div>
    <div className="admin-workspace" inert={menuOpen}><header className="admin-topbar"><div className="admin-breadcrumb"><button ref={toggle} className="admin-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="admin-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}</button><span>Workspace</span><i>/</i><strong>{title}</strong></div><div className="admin-top-actions"><Link to="/">View site <FiArrowUpRight /></Link><button aria-label="Sign out" onClick={() => { logout(); navigate('/admin/login', { replace: true }); }}><FiLogOut /><span>Sign out</span></button></div></header>
      <main className="admin-content" id="admin-content" tabIndex={-1}><Outlet /></main><footer className="admin-footer">Kenneth Altes <span>Portfolio Studio</span></footer>
    </div>
  </div>;
}
