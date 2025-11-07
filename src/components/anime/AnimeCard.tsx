import type { Anime } from "@/types/Anime";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const AnimeCard = ({ anime, index }: { anime: Anime; index: number }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Link to={`/anime/${anime.mal_id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          type: "spring",
          bounce: 0.1,
          delay: 0.3
        }}
        className="relative p-4 h-[460px]"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === index && (
            <motion.span
              className="absolute inset-0 h-full w-full bg-gray-100 dark:bg-zinc-800/80 block rounded-3xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 }
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.15,
                  delay: 0.2
                }
              }}
            />
          )}
        </AnimatePresence>
        <div className="rounded-2xl z-10 relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 h-full group overflow-hidden">
          <div className="flex flex-col">
            <div className="flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-600 group-hover:border-primary">
              <motion.img
                whileHover={{ scale: 1.05 }}
                className="rounded-t-xl w-full h-84 object-fill"
                src={anime.images.jpg.image_url}
                alt={anime.title}
              />
            </div>
            <div className="p-4 space-y-4">
              <h3 className="min-h-12 text-lg font-bold line-clamp-2">{anime.title}</h3>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default AnimeCard;
