'use client';
import { useProgress } from '../hooks/useProgress';

export default function EpisodeProgress({ animeId, episodeId }: { animeId: string, episodeId: string }) {
  const { progress, updateProgress } = useProgress(animeId, episodeId);
  return (
    <div className="mt-2">
      <label htmlFor={`progress-${animeId}-${episodeId}`} className="text-sm text-gray-400">Progress: {progress}%</label>
      <input
        id={`progress-${animeId}-${episodeId}`}
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={e => updateProgress(Number(e.target.value))}
        className="w-full"
        title="Episode progress"
      />
    </div>
  );
}
