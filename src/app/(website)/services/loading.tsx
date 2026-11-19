export default function ServicesLoading() {
  return (
    <div className="w-full bg-surface py-16 animate-pulse">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="h-3 w-28 bg-secondary/30 rounded mb-3" />
        <div className="h-12 w-56 bg-primary/10 rounded mb-4" />
        <div className="h-4 w-full max-w-lg bg-espresso/10 rounded mb-12" />
        <div className="space-y-10">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-8 w-40 bg-primary/10 rounded mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-28 bg-surface-container-low rounded" />
                <div className="h-28 bg-surface-container-low rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
