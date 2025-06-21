import { fetchAnimeById, fetchEpisodes } from '../../lib/aniwatchApi';
import WatchTogetherButton from '../../../components/WatchTogetherButton';
import Recommendations from '../../../components/Recommendations';

export default async function AnimePage({ params }: { params: { id: string } }) {
  const anime = await fetchAnimeById(params.id);
  const episodes = await fetchEpisodes(params.id);

  return (
    <div className="py-8">
      <div className="flex gap-8">
        <img src={anime.image || anime.coverImage} alt={anime.title} className="w-60 h-80 object-cover rounded-lg shadow-lg" />
        <div>
          <h1 className="text-3xl font-bold text-neon mb-2">{anime.title}</h1>
          <p className="text-gray-300 mb-4">{anime.description}</p>
          <div className="mb-2">
            <span className="font-semibold">Genres:</span> {anime.genres?.join(', ')}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Trending:</span> {anime.trending ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Episodes</h2>
      <WatchTogetherButton animeId={anime.id} />
      <Recommendations watchHistory={[anime.title]} />
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {episodes.map((ep: any) => (
          <li key={ep.id} className="bg-gray-800 rounded p-3 hover:bg-neon hover:text-black cursor-pointer transition-all">
            <a href={`/anime/${anime.id}/episode/${ep.id}`}>Ep {ep.number}: {ep.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const dynamic = 'force-dynamic';
