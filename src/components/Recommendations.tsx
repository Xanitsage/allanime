import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { openai } from '../lib/openai';

export default function Recommendations({ watchHistory }: { watchHistory: string[] }) {
  const { data: session } = useSession();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function getRecommendations() {
    setLoading(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session?.user?.email || 'guest', watchHistory }),
      });
      const data = await res.json();
      setRecommendations(data.recommendations.split('\n').filter(Boolean));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        onClick={getRecommendations}
        className="px-4 py-2 rounded bg-purple-500 text-white font-bold hover:bg-purple-600 transition"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get AI Recommendations'}
      </button>
      {recommendations.length > 0 && (
        <ul className="mt-4 bg-gray-800 rounded p-4">
          {recommendations.map((rec, i) => (
            <li key={i} className="mb-2">{rec}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
