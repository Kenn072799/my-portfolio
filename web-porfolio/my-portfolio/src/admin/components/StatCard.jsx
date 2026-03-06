export default function StatCard({ title, value, icon, sub, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-bg-card rounded-xl border border-border-default shadow-sm p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colors[color]}`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm text-text-muted">{title}</p>
        <p className="text-2xl font-bold text-text-primary">{value ?? "—"}</p>
        {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
