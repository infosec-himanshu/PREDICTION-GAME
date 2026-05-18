export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-spin">⏳</div>
        <p className="text-xl text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

