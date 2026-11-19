export default function AdminLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
      <div>
        <div className="h-7 w-56 bg-primary/10 rounded mb-2" />
        <div className="h-3 w-72 bg-espresso/10 rounded" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-white border border-admin-border rounded-lg" />
        ))}
      </div>
      <div className="h-64 bg-white border border-admin-border rounded-lg" />
    </div>
  );
}
