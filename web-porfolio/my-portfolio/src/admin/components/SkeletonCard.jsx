export default function SkeletonCard({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-bg-card rounded-xl border border-border-default shadow-sm p-5 flex items-center gap-4 animate-pulse"
        >
          <div className="w-12 h-12 rounded-lg bg-bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-bg-muted rounded w-1/3" />
            <div className="h-6 bg-bg-muted rounded w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
}

export function SkeletonTable() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-10 bg-bg-muted rounded-lg" />
      ))}
    </div>
  );
}
