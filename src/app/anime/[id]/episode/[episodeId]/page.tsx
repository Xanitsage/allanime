import { fetchAnimeById, fetchEpisodes } from '../../../../lib/aniwatchApi';
import EpisodeProgress from '../../../../components/EpisodeProgress';

export default async function EpisodePage({ params }: { params: { id: string; episodeId: string } }) {
  const anime = await fetchAnimeById(params.id);
  const episodes = await fetchEpisodes(params.id);
  const episode = episodes.find((ep: any) => ep.id === params.episodeId);

  if (!episode) return <div className="p-8">Episode not found.</div>;

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-neon mb-2">{anime.title} - Episode {episode.number}</h1>
      <h2 className="text-lg mb-4">{episode.title}</h2>
      <video controls className="w-full max-w-3xl mb-6" src={episode.videoUrl} poster={anime.image || anime.coverImage} />
      <EpisodeProgress animeId={anime.id} episodeId={episode.id} />
      <div className="text-gray-300">Duration: {episode.duration} min</div>
      <a href={`/anime/${anime.id}`} className="text-neon underline mt-4 inline-block">Back to Anime</a>
    </div>
  );
}

export const dynamic = 'force-dynamic';
