"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import tiles from "@/data/tiles.json";
import { ChevronLeft, Info, Maximize, Ruler, Layers } from "lucide-react";
import { motion } from "framer-motion";

import AuthGuard from "@/components/auth/AuthGuard";

/**
 * Tile Details Page
 * 
 * Renders full information for a specific tile.
 * Features:
 * - Dynamic data fetching based on URL ID
 * - Specification breakdown with icons
 * - Responsive layout (Image vs Info)
 */
function TileContent() {
  const { id } = useParams();
  const router = useRouter();
  
  const tile = tiles.find(t => t.id === id);

  if (!tile) {
    return (
      <div className="pt-40 text-center space-y-4">
        <h2 className="text-2xl font-semibold text-white">Tile not found</h2>
        <Link href="/all-tiles" className="text-gray-400 underline">Return to Gallery</Link>
      </div>
    );
  }

  return (
    <div className="pt-48 pb-20 max-w-[1400px] mx-auto px-6 md:px-12">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-[10px] uppercase tracking-widest font-bold"
      >
        <ChevronLeft size={16} /> Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left: Image Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-square relative overflow-hidden bg-white/5 border border-white/10 rounded-sm"
        >
          <img
            src={tile.image}
            alt={tile.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2070&auto=format&fit=crop";
            }}
          />
        </motion.div>

        {/* Right: Info & Specs */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-12"
        >
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
              {tile.series}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              {tile.title}
            </h1>
            <p className="text-xs text-accent font-bold uppercase tracking-widest">
              By {tile.creator}
            </p>
            <p className="text-lg text-gray-400 font-manrope leading-relaxed max-w-lg">
              {tile.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {tile.tags?.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 text-[9px] uppercase tracking-widest text-gray-400 border border-white/5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 border-t border-white/10 pt-10">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/5 rounded-sm">
                <Ruler size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Dimensions</p>
                <p className="text-white font-medium">{tile.dimensions}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/5 rounded-sm">
                <Layers size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Material</p>
                <p className="text-white font-medium">{tile.material}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/5 rounded-sm">
                <Maximize size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Finish</p>
                <p className="text-white font-medium">{tile.finish}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/5 rounded-sm">
                <Info size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Price / m²</p>
                <p className="text-white font-medium">${tile.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <button className="premium-btn w-full md:w-auto bg-white text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-colors rounded-sm shadow-xl shadow-white/5">
              Request Technical Quote
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function TileDetails() {
  return (
    <AuthGuard>
      <TileContent />
    </AuthGuard>
  );
}
