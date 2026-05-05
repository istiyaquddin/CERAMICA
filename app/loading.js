/**
 * Loading Component
 * 
 * Displayed during route transitions or data fetching.
 * Minimalist design ensures a smooth user experience.
 */
export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-surface dark:bg-black">
      <div className="flex flex-col items-center gap-6">
        <div className="w-12 h-12 border-2 border-stone-200 dark:border-stone-800 border-t-stone-900 dark:border-t-stone-50 rounded-full animate-spin"></div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold animate-pulse">
          Loading Catalog
        </span>
      </div>
    </div>
  );
}
