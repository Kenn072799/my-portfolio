import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
  { label: "Projects", path: "/admin/projects", icon: "🚀" },
  { label: "Skills", path: "/admin/skills", icon: "⚡" },
  { label: "Experience", path: "/admin/experience", icon: "💼" },
  { label: "Certifications", path: "/admin/certifications", icon: "🏆" },
  { label: "Analytics", path: "/admin/analytics", icon: "📈" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 bg-bg-card border-r border-border-default h-screen flex flex-col">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-border-default">
        <span className="text-base font-bold text-text-primary">
          Portfolio CMS
        </span>
        <p className="text-xs text-text-muted mt-0.5">Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ label, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-text-secondary hover:bg-bg-muted hover:text-text-primary"
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border-default">
        <a
          href="/"
          className="block text-xs text-text-muted hover:text-text-secondary text-center transition-colors"
        >
          ← View Portfolio
        </a>
      </div>
    </aside>
  );
}
