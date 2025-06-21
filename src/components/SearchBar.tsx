'use client';

import { useState, useRef } from 'react';
import { searchAnime } from '../lib/aniwatchApi';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    setError(null);
    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await searchAnime(value);
        setResults(data.results || data);
        setShowDropdown(true);
      } catch {
        setResults([]);
        setShowDropdown(false);
        setError('Failed to search anime.');
      } finally {
        setLoading(false);
      }
    }, 300);
  }

  function handleSelect(anime: any) {
    window.location.href = `/anime/${anime.id}`;
    setShowDropdown(false);
  }

  return (
    <div className="relative w-64">
      <input
        type="search"
        className="rounded-md px-3 py-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon transition-all w-full"
        placeholder="Search anime..."
        value={query}
        onChange={handleChange}
        aria-label="Search anime"
        onFocus={() => setShowDropdown(results.length > 0)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      {showDropdown && (
        <ul className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
          {loading && <li className="px-4 py-2 text-gray-400">Searching...</li>}
          {error && <li className="px-4 py-2 text-red-400">{error}</li>}
          {!loading && !error && results.map(anime => (
            <li
              key={anime.id}
              className="px-4 py-2 hover:bg-neon hover:text-black cursor-pointer"
              onMouseDown={() => handleSelect(anime)}
            >
              {anime.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
