export default function PortfolioLoading() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero skeleton */}
      <section className="pt-36 pb-14">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
          <div className="h-3 w-28 mx-auto rounded bg-[#f1f5f9] animate-pulse" />
          <div className="h-10 w-72 mx-auto rounded bg-[#f1f5f9] animate-pulse" />
          <div className="h-4 w-96 mx-auto rounded bg-[#f1f5f9] animate-pulse" />
        </div>
      </section>
      {/* Cards skeleton */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-v2 rounded-[22px] border border-[#dde4ec] overflow-hidden bg-white p-5 space-y-4 shadow-sm">
              <div className="w-full h-48 bg-[#f1f5f9] rounded-xl animate-pulse" />
              <div className="h-5 w-2/3 bg-[#f1f5f9] rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-[#f1f5f9] rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
