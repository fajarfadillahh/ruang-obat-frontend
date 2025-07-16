export default function ChatLoading() {
  return (
    <>
      <div className="flex items-center space-x-1">
        <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 [animation-delay:-0.3s] dark:bg-gray-300"></span>
        <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 [animation-delay:-0.15s] dark:bg-gray-300"></span>
        <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 dark:bg-gray-300"></span>
      </div>
    </>
  );
}
