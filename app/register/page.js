"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Globe,
  Image as ImageIcon,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, loginWithGoogle, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!name || !email || !password) {
        throw new Error("Please fill in all required fields");
      }
      await register(name, email, password, photoURL);
      toast.success("Account created! Please login.");
      router.push("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-20 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-10 bg-white/5 p-10 md:p-12 border border-white/10 rounded-sm"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white uppercase">
            Register
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">
            Create your architect profile
          </p>
        </div>

        <form autoComplete="on" className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="register-name"
                className="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Architectural Professional"
                  className="w-full bg-transparent border-b border-white/10 focus:border-white py-3 text-sm outline-none text-white transition-colors"
                  required
                />
                <User
                  size={18}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="register-email"
                className="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                Photo URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-transparent border-b border-white/10 focus:border-white py-3 text-sm outline-none text-white transition-colors"
                />
                <ImageIcon
                  size={18}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="register-password"
                className="text-[10px] uppercase tracking-widest text-gray-500 font-bold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
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
            disabled={isSubmitting}
            className="premium-btn w-full bg-white text-black py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/5"></span>
          </div>
          <span className="relative bg-black/40 px-4 text-[10px] uppercase tracking-widest text-gray-600 font-bold">
            Or join with
          </span>
        </div>

        <button
          type="button"
          onClick={() => loginWithGoogle()}
          className="w-full flex items-center justify-center gap-3 border border-white/10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all text-white"
        >
          <Globe size={18} /> Google
        </button>

        <p className="text-center text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white underline underline-offset-4 ml-2 hover:text-gray-300"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
