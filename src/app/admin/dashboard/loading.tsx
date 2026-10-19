export default function AdminLoading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-2 sm:p-4">
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-xl bg-[#e2e8f0] animate-pulse" />
        <div className="h-4 w-80 rounded-lg bg-[#e2e8f0]/60 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#e2e8f0] bg-white p-6 h-[124px] animate-pulse shadow-xs"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-[#e2e8f0] bg-white p-6 h-72 animate-pulse shadow-xs" />
        <div className="lg:col-span-3 rounded-2xl border border-[#e2e8f0] bg-white p-6 h-72 animate-pulse shadow-xs" />
      </div>
    </div>
  );
}
