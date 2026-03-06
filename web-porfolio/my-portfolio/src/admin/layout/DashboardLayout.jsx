import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { logout } from "../components/RequireAuth";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/skills": "Skills",
  "/admin/experience": "Experience",
  "/admin/certifications": "Certifications",
  "/admin/analytics": "Analytics",
};

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[pathname] ?? "Admin";

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-bg-main overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-bg-card border-b border-border-default px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="font-semibold text-text-primary">{title}</h2>
          <button
            onClick={handleLogout}
            className="text-xs text-text-muted hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
