export default function PortfolioLoading() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero skeleton */}
      <section className="pt-36 pb-14">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
          <div className="h-3 w-28 mx-auto rounded bg-white/[0.05] animate-pulse" />
          <div className="h-10 w-72 mx-auto rounded bg-white/[0.04] animate-pulse" />
          <div className="h-4 w-96 mx-auto rounded bg-white/[0.03] animate-pulse" />
        </div>
      </section>
      {/* Cards skeleton */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/6 overflow-hidden bg-white/[0.01] p-5 space-y-4">
              <div className="w-full h-48 bg-white/[0.03] rounded-xl animate-pulse" />
              <div className="h-5 w-2/3 bg-white/[0.03] rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-white/[0.03] rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
