// src/app/layout.tsx
import '../styles/globals.css';
import Header from '../components/Header';
import WatchlistButton from '../components/WatchlistButton';
import TrendingCarousel from '../components/TrendingCarousel';
import Chatbot from '../components/Chatbot';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'AnimeSynapse - Cosmic Anime Streaming',
  description: 'Watch trending anime in cosmic style. Group watch, AI recommendations, and more.',
  keywords: [
    'anime', 'streaming', 'cosmic', 'neon', 'void', 'synapse', 'watch2gether', 'AI', 'Discord', 'PWA', 'Next.js'
  ],
  openGraph: {
    title: 'AnimeSynapse - Cosmic Anime Streaming',
    description: 'Watch trending anime, group watch, and get AI-powered recommendations.',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'AnimeSynapse Logo',
      },
    ],
    type: 'website',
    siteName: 'AnimeSynapse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnimeSynapse - Cosmic Anime Streaming',
    description: 'Watch trending anime, group watch, and get AI-powered recommendations.',
    images: ['/icons/icon-512x512.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
        <SessionProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-4">
            {/* Only render TrendingCarousel on the client */}
            {typeof window !== 'undefined' && <TrendingCarousel />}
            {children}
          </main>
          <WatchlistButton />
          <Chatbot />
        </SessionProvider>
      </body>
    </html>
  );
}
