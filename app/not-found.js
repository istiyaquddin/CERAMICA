import Link from "next/link";
import { ArrowLeft } from "lucide-react";


export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-8 text-center space-y-8 bg-stone-50 dark:bg-stone-900">
      <div className="space-y-4">
        <h1 className="text-9xl font-light text-stone-200 dark:text-stone-800">404</h1>
        <h2 className="text-3xl font-medium text-stone-900 dark:text-stone-50 uppercase tracking-widest">
          Surface Not Found
        </h2>
        <p className="text-stone-500 dark:text-stone-400 font-inter max-w-md mx-auto">
          The architectural specification you are looking for has been moved or no longer exists in our catalog.
        </p>
      </div>
      
      <Link 
        href="/all-tiles"
        className="flex items-center gap-3 bg-stone-900 dark:bg-stone-50 text-white dark:text-stone-900 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
      >
        <ArrowLeft size={16} /> Return to Gallery
      </Link>
    </div>
  );
}
