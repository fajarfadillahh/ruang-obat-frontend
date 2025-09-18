export default function ThreadSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-2xl bg-gray-50 p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-full rounded-lg bg-gray-200" />
              <div className="h-3 w-2/3 rounded-lg bg-gray-100" />
            </div>
            <div className="ml-3 h-7 w-7 rounded-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
