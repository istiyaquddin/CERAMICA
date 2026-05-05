"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { User, ImageIcon, Loader2, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import AuthGuard from "@/components/auth/AuthGuard";
import { authClient } from "@/lib/auth-client";

function UpdateProfileContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.updateUser({
        name: name,
        image: image,
      });

      if (error) throw error;

      toast.success("Profile updated successfully!");
      router.push("/my-profile");
      // Force a page refresh to update session data
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-xl mx-auto px-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-[10px] uppercase tracking-widest font-bold"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1A1A1A] border border-white/5 p-10 md:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
        
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
            Update Profile
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-tertiary font-bold">
            Modify your professional credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">New Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Architect Name"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:border-accent outline-none text-white font-manrope text-sm transition-colors pl-8"
                />
                <User size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600" />
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">New Image URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-transparent border-b border-white/10 py-3 focus:border-accent outline-none text-white font-manrope text-sm transition-colors pl-8"
                />
                <ImageIcon size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gray-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : "Update Information"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function UpdateProfilePage() {
  return (
    <AuthGuard>
      <UpdateProfileContent />
    </AuthGuard>
  );
}
