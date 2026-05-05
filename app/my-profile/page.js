"use client";

import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import { User, Mail, Camera, Settings, Bell, Shield, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * My Profile Page
 * 
 * Shows user information and logout functionality.
 * Protected by AuthGuard.
 */
function ProfileContent() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="pt-48 pb-20 max-w-5xl mx-auto px-6 md:px-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center md:items-end gap-10 mb-16 pb-16 border-b border-white/10"
      >
        {/* Avatar Section */}
        <div className="relative group">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-black shadow-2xl relative p-1 bg-gradient-to-tr from-accent/20 to-white/10">
            <img 
              src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
              alt={user.name} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <button className="absolute bottom-2 right-2 p-3 bg-accent text-black rounded-full hover:scale-110 transition-transform shadow-lg border-4 border-black">
            <Camera size={18} />
          </button>
        </div>

        {/* User Quick Info */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{user.name}</h1>
            <Link href="/my-profile/update">
              <button className="px-6 py-2 border border-white/20 hover:border-white transition-colors text-[10px] uppercase tracking-widest font-bold rounded-sm">
                Edit Profile
              </button>
            </Link>
          </div>
          <p className="text-gray-400 font-manrope uppercase tracking-[0.3em] text-[10px] font-bold">
            Architectural Enthusiast • Member
          </p>
        </div>
      </motion.div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Sidebar Nav */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <button className="flex items-center gap-4 w-full px-6 py-4 bg-white/5 text-white border-l-2 border-white text-[10px] font-bold uppercase tracking-widest transition-all">
            <User size={16} /> Personal Info
          </button>
          <button className="flex items-center gap-4 w-full px-6 py-4 text-gray-500 hover:text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all">
            <Bell size={16} /> Notifications
          </button>
          <button className="flex items-center gap-4 w-full px-6 py-4 text-gray-500 hover:text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all">
            <Shield size={16} /> Security
          </button>
          <button className="flex items-center gap-4 w-full px-6 py-4 text-gray-500 hover:text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all">
            <Settings size={16} /> Preferences
          </button>
          <div className="h-px bg-white/5 my-4"></div>
          <button 
            onClick={logout}
            className="flex items-center gap-4 w-full px-6 py-5 bg-red-500/5 text-red-500 hover:bg-red-500/10 text-[10px] font-bold uppercase tracking-[0.3em] transition-all border-l-2 border-transparent hover:border-red-500"
          >
            <LogOut size={16} /> Logout Account
          </button>
        </div>

        {/* Form Content */}
        <div className="md:col-span-8 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email Address</label>
              <div className="flex items-center gap-3 py-4 border-b border-white/10">
                <Mail size={16} className="text-gray-400" />
                <span className="text-white text-sm font-medium">{user.email}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Organization</label>
              <div className="flex items-center gap-3 py-4 border-b border-white/10">
                <span className="text-white text-sm font-medium">Global Architecture Inc.</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Biography</label>
            <textarea 
              className="w-full bg-white/5 border border-white/10 p-6 text-white text-sm focus:border-white outline-none min-h-[150px] transition-all"
              placeholder="Share your architectural background..."
              defaultValue="Specializing in premium porcelain and stone applications for high-end residential projects."
            />
          </div>

          <div className="p-10 bg-white/5 border border-white/10 rounded-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">Saved Collections</h3>
              <p className="text-xs text-gray-400 mt-2">You have 12 saved tiles across 3 project boards.</p>
            </div>
            <Link href="/all-tiles" className="inline-block text-[10px] font-bold uppercase tracking-widest text-white border-b border-white py-1 hover:opacity-70 transition-opacity">
              Explore More Surfaces
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
