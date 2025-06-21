// src/lib/aniwatchApi.ts

export async function fetchTrendingAnime() {
  const res = await fetch('http://localhost:4000/anime/trending');
  if (!res.ok) throw new Error('Failed to fetch trending anime');
  return res.json();
}

export async function fetchAnimeById(id: string) {
  const res = await fetch(`http://localhost:4000/anime/${id}`);
  if (!res.ok) throw new Error('Failed to fetch anime');
  return res.json();
}

export async function searchAnime(query: string) {
  const res = await fetch(`http://localhost:4000/anime/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Failed to search anime');
  return res.json();
}

export async function fetchEpisodes(animeId: string) {
  const res = await fetch(`http://localhost:4000/anime/${animeId}/episodes`);
  if (!res.ok) throw new Error('Failed to fetch episodes');
  return res.json();
}

// Add more API helpers as needed
