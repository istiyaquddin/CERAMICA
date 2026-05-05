"use client";

import { Search, ChevronDown } from "lucide-react";

/**
 * FilterBar Component
 * 
 * Handles search input and dropdown filters for material, size, and finish.
 * 
 * Props:
 * - onSearch: Function to handle search input change
 * - onFilter: Function to handle dropdown filter change
 * - filters: Current filter states
 */
export default function FilterBar({ onSearch, onFilter, filters }) {
  return (
    <section className="mb-stack-md">
      {/* Search Bar - Large Hero UI */}
      <div className="mb-12">
        <label className="text-[10px] uppercase tracking-widest text-accent font-bold mb-3 block">Search Collection</label>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search tiles by title or series..."
            value={filters.search || ""}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-transparent border-b border-white/10 focus:border-accent py-4 text-xl md:text-2xl font-medium outline-none text-white placeholder:text-gray-600 transition-all tracking-tight"
          />
          <Search size={20} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      {/* Header & Results Count */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter border-b border-gray-100 dark:border-gray-800 pb-stack-sm">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
            Refine Selection
          </span>
          <h2 className="text-4xl font-bold text-[#111827] dark:text-white">
            All Tiles
          </h2>
        </div>
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-widest">
          <span className="text-[#111827] dark:text-white font-bold">{filters.search ? 'Filtering' : 'Viewing'} Gallery</span>
          <span className="w-px h-4 bg-gray-200 dark:bg-gray-800"></span>
          <button className="flex items-center gap-2 hover:text-accent transition-premium">
            Sort by: Newest <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

        {/* Material Filter */}
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-widest text-white font-bold mb-3">Material</label>
          <select 
            value={filters.material}
            onChange={(e) => onFilter('material', e.target.value)}
            className="w-full bg-transparent border-b border-gray-800 focus:border-accent py-3 text-sm outline-none text-white font-medium appearance-none transition-premium cursor-pointer"
          >
            <option value="" className="bg-[#1A1A1A]">All Materials</option>
            <option value="Porcelain" className="bg-[#1A1A1A]">Porcelain</option>
            <option value="Natural Stone" className="bg-[#1A1A1A]">Natural Stone</option>
            <option value="Ceramic" className="bg-[#1A1A1A]">Ceramic</option>
            <option value="Glass" className="bg-[#1A1A1A]">Glass</option>
          </select>
        </div>

        {/* Size Filter */}
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-widest text-white font-bold mb-3">Size</label>
          <select 
            value={filters.size}
            onChange={(e) => onFilter('size', e.target.value)}
            className="w-full bg-transparent border-b border-gray-800 focus:border-accent py-3 text-sm outline-none text-white font-medium appearance-none transition-premium cursor-pointer"
          >
            <option value="" className="bg-[#1A1A1A]">All Sizes</option>
            <option value="60 x 60" className="bg-[#1A1A1A]">60 x 60 cm</option>
            <option value="60 x 120" className="bg-[#1A1A1A]">60 x 120 cm</option>
            <option value="120 x 240" className="bg-[#1A1A1A]">120 x 240 cm</option>
            <option value="20 x 120" className="bg-[#1A1A1A]">20 x 120 cm</option>
            <option value="80 x 80" className="bg-[#1A1A1A]">80 x 80 cm</option>
          </select>
        </div>

        {/* Finish Filter */}
        <div className="flex flex-col w-full">
          <label className="text-[10px] uppercase tracking-widest text-white font-bold mb-3">Finish</label>
          <select 
            value={filters.finish}
            onChange={(e) => onFilter('finish', e.target.value)}
            className="w-full bg-transparent border-b border-gray-800 focus:border-accent py-3 text-sm outline-none text-white font-medium appearance-none transition-premium cursor-pointer"
          >
            <option value="" className="bg-[#1A1A1A]">All Finishes</option>
            <option value="Matte" className="bg-[#1A1A1A]">Matte</option>
            <option value="Polished" className="bg-[#1A1A1A]">Polished</option>
            <option value="Textured" className="bg-[#1A1A1A]">Textured</option>
            <option value="Glossy" className="bg-[#1A1A1A]">Glossy</option>
            <option value="Honed" className="bg-[#1A1A1A]">Honed</option>
            <option value="Flamed" className="bg-[#1A1A1A]">Flamed</option>
          </select>
        </div>
      </div>
    </section>
  );
}
