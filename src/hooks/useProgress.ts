import { useEffect, useState } from 'react';

export function useProgress(animeId: string, episodeId: string) {
  const key = `progress-${animeId}-${episodeId}`;
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setProgress(Number(stored));
  }, [key]);

  function updateProgress(value: number) {
    setProgress(value);
    localStorage.setItem(key, value.toString());
  }

  return { progress, updateProgress };
}
