import React, { useEffect, useState } from 'react';
import { getFavorites, removeFromFavorites } from '@/utils/localstorage';

interface Episode {
  id: string;
  title: string;
  description: string;
  episode: number;
  file: string;
}

const FavouritesBody: React.FC = () => {
  const [favorites, setFavorites] = useState<Episode[]>([]);

  useEffect(() => {
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (episodeId: string) => {
    removeFromFavorites(episodeId);
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== episodeId)
    );
  };

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
          Favorite Episodes
        </h2>
        {favorites.length > 0 ? (
          <ul className="grid gap-6">
            {favorites.map((episode) => (
              <li
                key={episode.id}
                className="bg-zinc-800 p-6 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2">{episode.title}</h3>
                  <p className="text-zinc-400">{episode.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(episode.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300 hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite episodes yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavouritesBody;