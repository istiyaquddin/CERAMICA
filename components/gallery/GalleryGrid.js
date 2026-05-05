"use client";

import TileCard from "../ui/TileCard";
import { motion } from "framer-motion";

export default function GalleryGrid({ tiles }) {
  if (tiles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400 font-manrope uppercase tracking-widest text-[10px] font-bold">
          No matches found for your selection.
        </p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.section 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 justify-items-stretch"
    >
      {tiles.map((tile) => (
        <TileCard key={tile.id} tile={tile} />
      ))}
    </motion.section>
  );
}
