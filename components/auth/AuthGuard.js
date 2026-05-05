"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login with current path as redirect query
        router.push(`/login?message=Please login to continue&redirect=${pathname}`);
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, loading, router, pathname]);

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-10"
        >
          <div className="relative">
            <div className="w-16 h-16 border-[1px] border-white/5 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-t-[1px] border-accent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-[10px] uppercase tracking-[0.6em] text-white font-bold">
              Secure Access
            </p>
            <p className="text-[8px] uppercase tracking-[0.4em] text-gray-600 font-bold">
              Verifying Credentials
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
