import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
const sections = ['Home', 'Projects', 'Experience', 'Skills', 'Certifications', 'Contact'];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const menuButton = useRef(null);
  const menu = useRef(null);
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
    const desktop = window.matchMedia('(min-width: 1025px)');
    function closeOnDesktop() { if (desktop.matches) setOpen(false); }
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector('a')?.focus();
    function close(event) {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
    }
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  function navigate(label) {
    setOpen(false);
    requestAnimationFrame(() => document.getElementById(label.toLowerCase())?.focus({ preventScroll: true }));
  }
  return <header className="portfolio-nav"><div className="portfolio-container nav-inner">
    <a className="brand" href="#home" aria-label="Kenneth Altes home" onClick={() => navigate('Home')}><strong>KA<span>.</span></strong></a>
    <nav ref={menu} id="portfolio-menu" aria-label="Main navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
      {sections.map((label) => <a key={label} href={`#${label.toLowerCase()}`} aria-current={active === label.toLowerCase() ? 'location' : undefined} onClick={() => navigate(label)}>{label}</a>)}
    </nav>
    <a className="outline-button nav-cta" href="#contact" onClick={() => navigate('Contact')}>Let’s Talk <FiArrowUpRight /></a>
    <button ref={menuButton} className="menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="portfolio-menu" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
  </div></header>;
}
