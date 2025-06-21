'use client';

import { motion } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

export default function Header() {
  const { data: session } = useSession();
  return (
    <motion.header
      className="sticky top-0 z-50 bg-gradient-to-r from-[#0f2027] via-[#2c5364] to-[#232526] dark:from-[#232526] dark:via-[#0f2027] dark:to-[#2c5364] shadow-lg flex items-center justify-between px-6 py-3"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 80 }}
    >
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold text-neon">AnimeSynapse</span>
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session ? (
          <>
            <span className="text-sm">{session.user?.name}</span>
            <button onClick={() => signOut()} className="px-3 py-1 rounded bg-gray-700 hover:bg-red-500 transition text-white">
              Sign out
            </button>
          </>
        ) : (
          <button onClick={() => signIn('discord')} className="px-3 py-1 rounded bg-neon text-black font-bold">
            Sign in with Discord
          </button>
        )}
      </div>
    </motion.header>
  );
}
