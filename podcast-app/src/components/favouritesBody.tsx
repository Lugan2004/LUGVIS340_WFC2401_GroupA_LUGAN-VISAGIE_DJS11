import React, { useState } from 'react';

interface FavoriteEpisode {
  title: string;
  description: string;
  file: string;
}

const FavoritesBody: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteEpisode[]>([]);

  const handleAddToFavorites = (episode: FavoriteEpisode) => {
    setFavorites([...favorites, episode]);
  };

  const handleRemoveFromFavorites = (index: number) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
          Favorites
        </h1>
        {favorites.length === 0 ? (
          <p className="text-zinc-400">No favorites added yet.</p>
        ) : (
          <div className="grid gap-6">
            {favorites.map((episode, index) => (
              <div key={index} className="bg-zinc-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{episode.title}</h3>
                  <button
                    className="flex items-center bg-zinc-700 text-zinc-100 px-4 py-2 rounded-md shadow-md transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#1A6DFF] hover:to-[#C822FF]"
                    onClick={() => handleRemoveFromFavorites(index)}
                  >
                    <RemoveIcon className="w-6 h-6 mr-2" />
                    Remove
                  </button>
                </div>
                <p className="text-zinc-400 mb-4">{episode.description}</p>
                <audio controls className="w-full">
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const RemoveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default FavoritesBody;