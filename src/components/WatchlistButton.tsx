'use client';

import { motion } from 'framer-motion';
import { useWatchlist } from '../hooks/useWatchlist';

export default function WatchlistButton() {
  const { watchlist } = useWatchlist();
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-neon"
      aria-label="Open watchlist"
      onClick={() => (window.location.href = '/watchlist')}
    >
      <span>⭐</span> Watchlist ({watchlist.length})
    </motion.button>
  );
}
