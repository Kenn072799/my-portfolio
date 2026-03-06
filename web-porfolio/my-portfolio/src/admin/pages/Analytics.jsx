import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getAnalyticsSummary,
  getTopQuestions,
  getAllVisitors,
} from "../api/analyticsApi";
import StatCard from "../components/StatCard";
import SkeletonCard, { SkeletonTable } from "../components/SkeletonCard";

function parseUserAgent(ua = "") {
  if (/edg/i.test(ua)) return "Edge";
  if (/chrome/i.test(ua)) return "Chrome";
  if (/firefox/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua)) return "Safari";
  if (/opera|opr/i.test(ua)) return "Opera";
  return "Other";
}

function todayUTC() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

export default function Analytics() {
  const [summary, setSummary] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, q, v] = await Promise.all([
          getAnalyticsSummary(),
          getTopQuestions(),
          getAllVisitors(),
        ]);
        setSummary(s);
        setQuestions(q);
        setVisitors(v);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Visitors today
  const today = todayUTC();
  const visitorsToday = visitors.filter((v) =>
    (v.visitedAt ?? "").startsWith(today),
  ).length;

  // Browser breakdown
  const browserMap = visitors.reduce((acc, v) => {
    const b = parseUserAgent(v.userAgent);
    acc[b] = (acc[b] || 0) + 1;
    return acc;
  }, {});
  const browserData = Object.entries(browserMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Top 10 questions chart
  const topQuestionsChart = questions.slice(0, 10).map((q) => ({
    question:
      q.question?.length > 30 ? q.question.slice(0, 30) + "…" : q.question,
    count: q.count,
  }));

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          <SkeletonCard count={3} />
        ) : (
          <>
            <StatCard
              title="Total Visitors"
              value={summary?.totalVisitors}
              icon="👥"
              color="blue"
            />
            <StatCard
              title="Visitors Today"
              value={visitorsToday}
              icon="🌐"
              color="green"
            />
            <StatCard
              title="AI Questions"
              value={summary?.totalChatMessages}
              icon="🤖"
              color="purple"
            />
          </>
        )}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Browser breakdown */}
        <div className="bg-bg-card rounded-xl border border-border-default shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            Browser Breakdown
          </h3>
          {loading ? (
            <SkeletonTable />
          ) : browserData.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-8">
              No visitor data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={browserData}
                margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top questions chart */}
        <div className="bg-bg-card rounded-xl border border-border-default shadow-sm p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">
            Top AI Questions
          </h3>
          {loading ? (
            <SkeletonTable />
          ) : topQuestionsChart.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-8">
              No chatbot questions yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={topQuestionsChart}
                layout="vertical"
                margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  dataKey="question"
                  type="category"
                  width={150}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Questions table */}
      <div className="bg-bg-card rounded-xl border border-border-default shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border-default">
          <h3 className="text-sm font-semibold text-text-primary">
            All Chatbot Questions
          </h3>
        </div>
        {loading ? (
          <div className="p-5">
            <SkeletonTable />
          </div>
        ) : questions.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-8">
            No questions yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bg-muted/30 border-b border-border-default">
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3">
                    Question
                  </th>
                  <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {questions.map((q, i) => (
                  <tr key={q.id ?? i} className="hover:bg-bg-muted/40">
                    <td className="px-5 py-3 text-text-primary">
                      {q.question}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="bg-purple-50 text-purple-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        {q.count}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Visitors table */}
      <div className="bg-bg-card rounded-xl border border-border-default shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border-default">
          <h3 className="text-sm font-semibold text-text-primary">
            Recent Visitors
          </h3>
        </div>
        {loading ? (
          <div className="p-5">
            <SkeletonTable />
          </div>
        ) : visitors.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-8">
            No visitors yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bg-muted/30 border-b border-border-default">
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3">
                    Browser
                  </th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3">
                    Country
                  </th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3">
                    IP Address
                  </th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wide px-5 py-3">
                    Visited At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {visitors.slice(0, 50).map((v) => (
                  <tr key={v.id} className="hover:bg-bg-muted/40">
                    <td className="px-5 py-3 text-text-primary">
                      {parseUserAgent(v.userAgent)}
                    </td>
                    <td className="px-5 py-3 text-text-primary">
                      {v.country || "—"}
                    </td>
                    <td className="px-5 py-3 text-text-muted font-mono text-xs">
                      {v.ipAddress || "—"}
                    </td>
                    <td className="px-5 py-3 text-text-muted text-xs">
                      {v.visitedAt
                        ? new Date(v.visitedAt).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
