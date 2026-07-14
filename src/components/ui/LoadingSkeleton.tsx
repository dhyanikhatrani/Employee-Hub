export default function LoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
          <div className="w-10 h-10 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-muted rounded w-1/3" />
            <div className="h-2 bg-muted rounded w-1/5" />
          </div>
          <div className="h-6 w-16 bg-muted rounded-full" />
          <div className="h-8 w-8 bg-muted rounded-lg" />
        </div>
      ))}
    </div>
  );
}
