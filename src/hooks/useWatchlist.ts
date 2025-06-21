import { useEffect, useState } from 'react';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(id: string) {
    setWatchlist(list => (list.includes(id) ? list : [...list, id]));
  }

  function removeFromWatchlist(id: string) {
    setWatchlist(list => list.filter(item => item !== id));
  }

  return { watchlist, addToWatchlist, removeFromWatchlist };
}
