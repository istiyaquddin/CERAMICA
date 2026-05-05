"use client";

import Link from "next/link";
import Image from "next/image";
import tiles from "@/data/tiles.json";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const featuredTiles = tiles.filter(tile => tile.featured).slice(0, 4);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const stagger = {
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="flex flex-col">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-light dark:bg-bg-dark pt-48 pb-24">
        {/* Animated Background Pattern */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#C5A059_0.5px,_transparent_0.5px)] [background-size:60px_60px]"></div>
        </motion.div>
        
        <motion.div 
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-8 max-w-4xl space-y-16"
        >
          <motion.div variants={fadeInUp} className="space-y-8">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-black">
              THE ART OF SURFACE
            </span>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.9] animate__animated animate__fadeInDown">
              Discover Your <br />
              <span className="text-accent italic font-light">Perfect Aesthetic</span>
            </h1>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <p className="text-gray-400 font-inter text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
              Curating the world's most exquisite architectural surfaces. 
              Precision-crafted tiles for environments that demand distinction.
            </p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
            <Link 
              href="/all-tiles"
              className="premium-btn bg-white text-black px-12 py-6 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4 shadow-2xl"
            >
              Browse Now <ArrowRight size={16} className="text-accent" />
            </Link>
            <Link 
              href="/about"
              className="premium-btn text-white px-12 py-6 text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 bg-white/5 backdrop-blur-md"
            >
              Our Philosophy
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <div className="bg-stone-900 border-y border-white/5 py-12 overflow-hidden flex whitespace-nowrap my-20">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center px-10"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-20 items-center">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">New Arrivals: Urban Concrete</span>
              <span className="text-accent text-lg">•</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Weekly Feature: Modern Geometric Patterns</span>
              <span className="text-accent text-lg">•</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Join the Community</span>
              <span className="text-accent text-lg">•</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Exquisite Surfaces</span>
              <span className="text-accent text-lg">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Featured Collection Section */}
      <section className="py-stack-lg max-w-container-max mx-auto px-8 md:px-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-tertiary font-bold">
              Selection
            </span>
            <h2 className="text-4xl font-semibold text-primary dark:text-neutral">
              Featured Gallery
            </h2>
          </div>
          <Link 
            href="/all-tiles" 
            className="text-xs font-bold uppercase tracking-widest border-b border-tertiary pb-1 hover:opacity-70 transition-opacity text-primary dark:text-neutral"
          >
            View All Series
          </Link>
        </div>
        
        <GalleryGrid tiles={featuredTiles} />
      </section>

      {/* Aesthetic Banner */}
      <section className="bg-neutral dark:bg-stone-900/50 py-24 px-8 text-center border-y border-border">
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl md:text-3xl font-light italic text-primary dark:text-neutral">
            "Design is not just what it looks like and feels like. Design is how it works."
          </h3>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-tertiary">
            Steve Jobs
          </p>
        </div>
      </section>
    </div>
  );
}
