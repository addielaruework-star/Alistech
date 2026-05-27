export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-white/30 text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
