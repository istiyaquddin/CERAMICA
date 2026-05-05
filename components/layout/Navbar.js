"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, User, LogOut, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Navbar Component
 * 
 * Features:
 * - Left: Logo
 * - Center: Home, All Tiles, My Profile (conditional)
 * - Right: Auth Actions (Login/Signup or Avatar/Logout)
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Tiles", href: "/all-tiles" },
    ...(user ? [{ name: "My Profile", href: "/my-profile" }] : []),
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 
        ${scrolled ? "glass-header py-4" : "bg-transparent py-8"}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="z-[110]">
          <h1 className="text-lg md:text-xl font-bold tracking-[0.3em] text-white uppercase transition-all hover:opacity-80">
            CERAMICA
          </h1>
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 py-2 group
                ${pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              {link.name}
              <motion.div 
                initial={false}
                animate={{ 
                  width: pathname === link.href ? "100%" : "0%",
                  opacity: pathname === link.href ? 1 : 0
                }}
                className="absolute bottom-0 left-0 h-[1px] bg-accent"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-20" />
            </Link>
          ))}
        </nav>

        {/* Right: Auth Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            <div className="flex items-center gap-8">
              <Link 
                href="/login"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="premium-btn bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-all rounded-sm"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link href="/my-profile" className="flex items-center gap-3 group relative">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 group-hover:border-accent/50 transition-colors p-0.5">
                  <img 
                    src={user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                    alt={user.name} 
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest">{user.name}</span>
                  <span className="text-[7px] text-gray-500 uppercase tracking-widest">Architect</span>
                </div>
              </Link>
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-red-400 transition-colors"
              >
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2 z-[110]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#1A1A1A] z-[105] flex flex-col items-center justify-center gap-8 md:hidden"
            >
              <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
                 <h1 className="text-4xl font-bold tracking-[0.5em] text-white uppercase vertical-text">CERAMICA</h1>
              </div>

              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-bold uppercase tracking-[0.3em] transition-all
                      ${pathname === link.href ? "text-white" : "text-gray-600 hover:text-white"}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="h-[1px] w-40 bg-white/10 my-4"
              ></motion.div>
              
              {!user ? (
                <div className="flex flex-col items-center gap-8">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-bold uppercase tracking-[0.3em] text-white"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-white text-black px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] rounded-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-8">
                  <Link 
                    href="/my-profile" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-bold uppercase tracking-[0.3em] text-white"
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-bold uppercase tracking-[0.3em] text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
