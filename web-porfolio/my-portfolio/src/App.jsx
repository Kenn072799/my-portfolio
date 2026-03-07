import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import RecentProjectPage from "./pages/RecentProjectPage";
import RecentCertificatePage from "./pages/RecentCertificatePage";
import Login from "./admin/pages/Login";
import DashboardLayout from "./admin/layout/DashboardLayout";
import Dashboard from "./admin/pages/Dashboard";
import Projects from "./admin/pages/Projects";
import Skills from "./admin/pages/Skills";
import Experience from "./admin/pages/Experience";
import Certifications from "./admin/pages/Certifications";
import Analytics from "./admin/pages/Analytics";
import RequireAuth from "./admin/components/RequireAuth";
import { trackVisitor } from "./api/visitorApi";

function App() {
  useEffect(() => {
    trackVisitor();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public portfolio */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="recent-project" element={<RecentProjectPage />} />
          <Route
            path="recent-certification"
            element={<RecentCertificatePage />}
          />
        </Route>

        {/* Admin panel */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
