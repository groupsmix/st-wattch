export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700" />
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-amber-500 animate-spin" />
      </div>
    </div>
  );
}
