import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAnalyticsSummary, getTopQuestions, getAllVisitors } from '../api/analyticsApi';
import StatCard from '../components/StatCard';
import SkeletonCard, { SkeletonTable } from '../components/SkeletonCard';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
function browserName(agent = '') {
  if (/edg/i.test(agent)) return 'Edge';
  if (/opera|opr/i.test(agent)) return 'Opera';
  if (/chrome/i.test(agent)) return 'Chrome';
  if (/firefox/i.test(agent)) return 'Firefox';
  if (/safari/i.test(agent)) return 'Safari';
  return 'Other';
}
function localDate(value) {
  return new Date(value).toLocaleDateString('en-CA', { timeZone: 'Asia/Manila' });
}
export default function Analytics() {
  const [summary, setSummary] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [stats, questionData, visitorData] = await Promise.all([getAnalyticsSummary(), getTopQuestions(), getAllVisitors()]);
        if (active) { setSummary(stats); setQuestions(questionData); setVisitors(visitorData); }
      } catch { if (active) setError('Unable to load analytics. Check the API connection and try again.'); }
      finally { if (active) setLoading(false); }
    }
    load(); return () => { active = false; };
  }, [attempt]);
  const today = localDate(new Date());
  const visitorsToday = visitors.filter((visitor) => visitor.visitedAt && localDate(visitor.visitedAt) === today).length;
  const browsers = visitors.reduce((counts, visitor) => { const name = browserName(visitor.userAgent); counts[name] = (counts[name] || 0) + 1; return counts; }, {});
  const browserData = Object.entries(browsers).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  const topQuestions = questions.slice(0, 10).map((question) => ({ question: question.question?.length > 20 ? `${question.question.slice(0, 20)}…` : question.question, count: question.count }));
  return <div className="space-y-7"><PageHeader title="Who’s discovering your work?" description="Portfolio activity and conversations, drawn from your existing analytics." />
    {error ? <div className="admin-error" role="alert">{error}<button className="admin-secondary" onClick={() => { setError(''); setLoading(true); setAttempt((value) => value + 1); }}>Try again</button></div> : <>
      <div className="admin-stat-grid analytics-stats">{loading ? <SkeletonCard count={3} /> : <><StatCard title="Total Visitors" value={summary?.totalVisitors} /><StatCard title="Visitors Today" value={visitorsToday} sub="Asia/Manila" color="green" /><StatCard title="AI Questions" value={summary?.totalChatMessages} color="purple" /></>}</div>
      <div className="admin-chart-grid"><section className="admin-chart"><h2>Browser breakdown</h2><p>How visitors explore your portfolio.</p>{loading ? <SkeletonTable /> : browserData.length === 0 ? <div className="chart-empty">No visitor data yet.</div> : <ResponsiveContainer width="100%" height={240}><BarChart data={browserData} margin={{ top: 20, right: 5, left: -25, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#1c2b40" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 14 }} axisLine={false} tickLine={false} /><YAxis allowDecimals={false} tick={{ fontSize: 14 }} axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="count" fill="#22d3ee" radius={[4, 4, 0, 0]} maxBarSize={45} isAnimationActive={false} /></BarChart></ResponsiveContainer>}</section>
      <section className="admin-chart"><h2>Top questions</h2><p>What people want to know about your work.</p>{loading ? <SkeletonTable /> : topQuestions.length === 0 ? <div className="chart-empty">No conversations yet.</div> : <ResponsiveContainer width="100%" height={240}><BarChart data={topQuestions} layout="vertical" margin={{ top: 20, right: 10, left: 0, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#1c2b40" horizontal={false} /><XAxis type="number" allowDecimals={false} tick={{ fontSize: 14 }} axisLine={false} tickLine={false} /><YAxis dataKey="question" type="category" width={130} tick={{ fontSize: 14 }} axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="count" fill="#818cf8" radius={[0, 4, 4, 0]} maxBarSize={20} isAnimationActive={false} /></BarChart></ResponsiveContainer>}</section></div>
      <section><div className="admin-section-heading"><span className="admin-eyebrow">CONVERSATIONS</span><h2>Questions people ask.</h2></div>{loading ? <SkeletonTable /> : <DataTable columns={[{ key: 'question', label: 'Question' }, { key: 'count', label: 'Times asked' }]} data={questions.map((question, index) => ({ ...question, id: question.id || `question-${index}` }))} emptyMessage="Conversations will appear here when visitors use the assistant." />}</section>
      <section><div className="admin-section-heading"><span className="admin-eyebrow">YOUR AUDIENCE</span><h2>Visitor activity.</h2></div>{loading ? <SkeletonTable /> : <DataTable columns={[{ key: 'browser', label: 'Browser' }, { key: 'country', label: 'Country' }, { key: 'ipAddress', label: 'IP address' }, { key: 'visitedLabel', label: 'Visited at (Manila)' }]} data={visitors.map((visitor) => ({ ...visitor, browser: browserName(visitor.userAgent), visitedLabel: visitor.visitedAt ? new Date(visitor.visitedAt).toLocaleString('en-PH', { timeZone: 'Asia/Manila' }) : '—' }))} emptyMessage="Visitor activity will appear here once it is recorded." />}</section>
    </>}
  </div>;
}
