export default function WebsiteLoading() {
  return (
    <div className="w-full bg-surface min-h-[50vh]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-16 md:py-20 animate-pulse">
        <div className="h-3 w-28 bg-secondary/30 rounded mb-4" />
        <div className="h-10 w-64 sm:w-80 bg-primary/10 rounded mb-4" />
        <div className="h-4 w-full max-w-md bg-espresso/10 rounded mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="aspect-[4/5] bg-surface-container-low rounded" />
          <div className="aspect-[4/5] bg-surface-container-low rounded hidden sm:block" />
          <div className="aspect-[4/5] bg-surface-container-low rounded hidden lg:block" />
        </div>
      </div>
    </div>
  );
}
