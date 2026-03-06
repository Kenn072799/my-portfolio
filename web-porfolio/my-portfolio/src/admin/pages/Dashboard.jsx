import { useEffect, useState } from "react";
import { getAnalyticsSummary } from "../api/analyticsApi";
import { getProjects } from "../api/projectApi";
import StatCard from "../components/StatCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [projectCount, setProjectCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, p] = await Promise.all([
          getAnalyticsSummary(),
          getProjects({ page: 1, pageSize: 1 }),
        ]);
        setSummary(s);
        setProjectCount(p.totalCount);
      } catch {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading ? (
          <SkeletonCard count={4} />
        ) : (
          <>
            <StatCard
              title="Total Visitors"
              value={summary?.totalVisitors}
              icon="👥"
              color="blue"
            />
            <StatCard
              title="AI Questions Asked"
              value={summary?.totalChatMessages}
              icon="🤖"
              color="purple"
            />
            <StatCard
              title="Total Projects"
              value={projectCount}
              icon="🚀"
              color="green"
            />
            <StatCard
              title="Top Question"
              value={summary?.topQuestionCount}
              icon="💬"
              sub={summary?.topQuestion || "No questions yet"}
              color="orange"
            />
          </>
        )}
      </div>

      {/* Quick links */}
      <div className="bg-bg-card rounded-xl border border-border-default shadow-sm p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">
          Quick Navigation
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Manage Projects", href: "/admin/projects", icon: "🚀" },
            { label: "Manage Skills", href: "/admin/skills", icon: "⚡" },
            {
              label: "Manage Experience",
              href: "/admin/experience",
              icon: "💼",
            },
            {
              label: "Certifications",
              href: "/admin/certifications",
              icon: "🏆",
            },
            { label: "Analytics", href: "/admin/analytics", icon: "📈" },
          ].map(({ label, href, icon }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-2 p-3 rounded-lg border border-border-default hover:border-blue-200 hover:bg-blue-50 transition-colors text-sm text-text-primary"
            >
              <span>{icon}</span> {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
