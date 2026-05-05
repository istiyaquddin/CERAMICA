"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


export default function TileCard({ tile }) {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  return (
    <motion.div 
      variants={item}
      className="group card-premium"
    >
      <Link href={`/tile/${tile.id}`}>
        {/* Image Container with Hover Zoom & Overlay */}
        <div className="aspect-[4/5] overflow-hidden relative bg-[#0B0F19] border-b border-white/5">
          <img
            src={tile.image}
            alt={tile.title}
            className="w-full h-full object-cover image-zoom transition-premium"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2070&auto=format&fit=crop";
            }}
          />
          <div className="image-overlay"></div>
          
          {/* Subtle Series Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-accent rounded-full border border-accent/20">
              {tile.material}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-manrope text-[10px] uppercase tracking-[0.2em] text-secondary-text font-bold">
                {tile.series}
              </p>
              <h3 className="text-xl font-bold text-white transition-premium group-hover:text-accent">
                {tile.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-accent font-black text-sm">${tile.price}</span>
              <p className="text-[8px] uppercase tracking-tighter text-gray-500 font-bold">per sqm</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-6 border-t border-white/5">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 font-inter font-bold uppercase tracking-widest">
                {tile.dimensions}
              </span>
              <span className={`text-[8px] uppercase tracking-widest font-black ${tile.inStock ? 'text-green-500/80' : 'text-red-500/80'}`}>
                {tile.inStock ? '● In Stock' : '○ Out of Stock'}
              </span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white font-black flex items-center gap-2 group-hover:gap-4 transition-premium">
              EXPLORE <ArrowRight size={14} className="text-accent group-hover:scale-125 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
