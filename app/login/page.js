"use client";

import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Globe, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

/**
 * Login Page
 *
 * Features:
 * - Email/Password authentication
 * - Google Login integration
 * - Loading states & Error handling
 * - Success redirect
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const { login, loginWithGoogle, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const message = searchParams.get("message");
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [user, router, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }
      await login(email, password);
      toast.success("Welcome back!");
      router.push(redirect);
    } catch (err) {
      toast.error(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleSubmitting(true);
    try {
      await loginWithGoogle();
      // Google redirect happens automatically via better-auth
    } catch (err) {
      toast.error("Google login failed. Please try again.");
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-20 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12 bg-white/5 p-10 md:p-12 border border-white/10 rounded-sm"
      >
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 border border-accent/20 rounded-full mb-4">
            <p className="text-[8px] uppercase tracking-[0.4em] text-accent font-bold">
              Studio Access
            </p>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white uppercase">
            Login
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
            Enter your architectural credentials
          </p>
        </div>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 p-4 text-[10px] uppercase tracking-widest font-bold rounded-sm bg-blue-500/10 text-blue-400 border border-blue-500/20"
            >
              <AlertCircle size={16} />
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} autoComplete="on" className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="login-email"
                className="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@studio.com"
                  className="w-full bg-transparent border-b border-white/10 focus:border-white py-3 text-sm outline-none text-white transition-colors"
                  required
                />
                <Mail
                  size={18}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="login-password"
                className="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-white/10 focus:border-white py-3 text-sm outline-none text-white transition-colors"
                  required
                />
                <Lock
                  size={18}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600"
                />
              </div>
            </div>
          </div>

          <button
            disabled={isSubmitting || isGoogleSubmitting}
            className="premium-btn w-full bg-white text-black py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <span>Sign In</span>
                <div className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/5"></span>
          </div>
          <span className="relative bg-black/40 px-4 text-[10px] uppercase tracking-widest text-gray-600 font-bold">
            OR
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isSubmitting || isGoogleSubmitting}
          className="w-full flex items-center justify-center gap-3 border border-white/10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all text-white disabled:opacity-50"
        >
          {isGoogleSubmitting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <>
              <Globe size={18} /> Continue with Google
            </>
          )}
        </button>

        <p className="text-center text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-white underline underline-offset-4 ml-2 hover:text-gray-300"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
