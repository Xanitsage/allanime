'use client';
import { useWatchlist } from '../hooks/useWatchlist';
import { useEffect, useState } from 'react';
import { fetchAnimeById } from '../lib/aniwatchApi';

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [animeList, setAnimeList] = useState<any[]>([]);

  useEffect(() => {
    Promise.all(watchlist.map(id => fetchAnimeById(id).catch(() => null)))
      .then(list => setAnimeList(list.filter(Boolean)));
  }, [watchlist]);

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-neon mb-6">Your Watchlist</h1>
      {animeList.length === 0 ? (
        <div className="text-gray-400">Your watchlist is empty.</div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {animeList.map(anime => (
            <li key={anime.id} className="bg-gray-800 rounded-lg p-4 flex gap-4 items-center">
              <img src={anime.image || anime.coverImage} alt={anime.title} className="w-20 h-28 object-cover rounded" />
              <div className="flex-1">
                <a href={`/anime/${anime.id}`} className="text-lg font-semibold text-neon hover:underline">{anime.title}</a>
                <button
                  className="ml-4 text-red-400 hover:underline"
                  onClick={() => removeFromWatchlist(anime.id)}
                >Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
