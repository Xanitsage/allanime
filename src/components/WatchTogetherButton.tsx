import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function WatchTogetherButton({ animeId }: { animeId: string }) {
  const { data: session } = useSession();
  const [roomUrl, setRoomUrl] = useState<string | null>(null);

  async function createRoom() {
    // Simulate creating a Discord invite link (replace with real API call if needed)
    setRoomUrl('https://discord.com/invite/your-room-id');
  }

  if (!session) return null;

  return (
    <div className="mt-4">
      <button
        onClick={createRoom}
        className="px-4 py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
      >
        Watch Together on Discord
      </button>
      {roomUrl && (
        <div className="mt-2">
          <a href={roomUrl} target="_blank" rel="noopener noreferrer" className="text-neon underline">Join Discord Room</a>
        </div>
      )}
    </div>
  );
}
