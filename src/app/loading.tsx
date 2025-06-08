export default function LoadingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      {/* full‐page spinner or skeleton */}
      <div className="space-y-4 animate-pulse p-8 rounded-lg bg-white/10">
        <div className="h-8 bg-gray-500 rounded w-48"></div>
        <div className="h-4 bg-gray-500 rounded w-96"></div>
        <div className="h-64 bg-gray-500 rounded"></div>
      </div>
    </main>
  );
}