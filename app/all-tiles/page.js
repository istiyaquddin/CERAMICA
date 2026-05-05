"use client";

import { useState, useMemo, useEffect } from "react";
import tilesData from "@/data/tiles.json";
import FilterBar from "@/components/ui/FilterBar";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function AllTilesPage() {
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    material: "",
    size: "",
    finish: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Show 4 items per page for better UX

  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredTiles = useMemo(() => {
// ... existing filter logic ...
    return tilesData.filter(tile => {
      const matchesSearch = 
        tile.title.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
        tile.series.toLowerCase().includes(activeFilters.search.toLowerCase());
      
      const matchesMaterial = !activeFilters.material || tile.material === activeFilters.material;
      const matchesFinish = !activeFilters.finish || tile.finish === activeFilters.finish;
      const matchesSize = !activeFilters.size || tile.dimensions.includes(activeFilters.size);

      return matchesSearch && matchesMaterial && matchesFinish && matchesSize;
    });
  }, [activeFilters]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTiles.length / pageSize);
  const paginatedTiles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTiles.slice(start, start + pageSize);
  }, [filteredTiles, currentPage, pageSize]);

  // Handle filter changes (reset to page 1)
  const handleFilterChange = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1);
  };

  return (
    <div className="pt-48 pb-stack-lg max-w-container-max mx-auto px-8 md:px-16">
      
      {/* Search and Filters Section */}
      <FilterBar 
        onSearch={(val) => handleFilterChange('search', val)} 
        onFilter={handleFilterChange}
        filters={activeFilters}
      />

      {/* Gallery Section */}
      <div className="mt-8 min-h-[400px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 border-2 border-white/5 border-t-accent rounded-full animate-spin"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Curating Collection...</span>
          </div>
        ) : (
          <GalleryGrid key={JSON.stringify(activeFilters) + currentPage} tiles={paginatedTiles} />
        )}
      </div>

      {/* Pagination Functional Logic */}
      {totalPages > 1 && (
        <div className="mt-stack-lg flex justify-center items-center gap-8 border-t border-gray-800 pt-12">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`transition-colors ${currentPage === 1 ? 'text-gray-700' : 'text-gray-400 hover:text-white'}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-6 font-manrope font-bold text-xs tracking-widest">
            {[...Array(totalPages)].map((_, i) => (
              <span 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`cursor-pointer transition-all ${
                  currentPage === i + 1 
                    ? "text-accent underline underline-offset-8" 
                    : "text-gray-500 hover:text-white"
                }`}
              >
                0{i + 1}
              </span>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`transition-colors ${currentPage === totalPages ? 'text-gray-700' : 'text-gray-400 hover:text-white'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
