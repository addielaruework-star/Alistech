export default function AdminLoading() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <div className="h-6 w-40 rounded bg-white/[0.05] animate-pulse" />
      <div className="h-4 w-64 rounded bg-white/[0.03] animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 h-[110px] animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-6">
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 h-64 animate-pulse" />
        <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 h-64 animate-pulse" />
      </div>
    </div>
  );
}
