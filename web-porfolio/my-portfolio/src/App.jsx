import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import NotFound from './pages/NotFound';
const Login = lazy(() => import("./admin/pages/Login"));
const DashboardLayout = lazy(() => import("./admin/layout/DashboardLayout"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const Projects = lazy(() => import("./admin/pages/Projects"));
const Skills = lazy(() => import("./admin/pages/Skills"));
const Experience = lazy(() => import("./admin/pages/Experience"));
const Certifications = lazy(() => import("./admin/pages/Certifications"));
const Analytics = lazy(() => import("./admin/pages/Analytics"));
import RequireAuth from "./admin/components/RequireAuth";
import { trackVisitor } from "./api/visitorApi";

function App() {
  useEffect(() => {
    trackVisitor();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-text-secondary" role="status">Loading…</div>}><Routes>
        {/* Public portfolio */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="recent-project" element={<Navigate to="/#projects" replace />} />
          <Route
            path="recent-certification"
            element={<Navigate to="/#certifications" replace />}
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
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes></Suspense>
    </BrowserRouter>
  );
}

export default App;
