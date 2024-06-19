import React, { useState, useEffect } from 'react';
import FavouritesBtn from './favouritesBtn';
import PlayButton from './Playbutton';
import { isFavorite, addToFavorites } from '@/utils/localstorage';

interface Episode {
  id: string;
  title: string;
  description: string;
  episode: number;
  file: string;
}

interface EpisodeProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
}

const EpisodeCard: React.FC<EpisodeProps> = ({
  episode,
  onPlay,
}) => {
  const [isFav, setIsFav] = useState<boolean>(isFavorite(episode.id));

  useEffect(() => {
    setIsFav(isFavorite(episode.id));
  }, [episode.id]);

  const handlePlay = () => {
    onPlay(episode);
  };

  const handleAddToFavorites = () => {
    addToFavorites(episode);
    setIsFav(true);
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold">{episode.title}</h3>
          <p className="text-sm text-zinc-400">Episode {episode.episode}</p>
        </div>
        <div className="flex items-center">
          <PlayButton onClick={handlePlay} />
          <FavouritesBtn
            episode={episode}
            onAddToFavorites={handleAddToFavorites}
            disabled={isFav}
          />
          <button
            onClick={() => window.open(episode.file, '_blank')}
            className="bg-zinc-700 text-zinc-100 px-4 py-2 rounded-md shadow-md transition-colors duration-300 ml-4"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span className="ml-2">Download</span>
          </button>
        </div>
      </div>
      <p className="text-zinc-400 mb-4">{episode.description}</p>
    </div>
  );
};

export default EpisodeCard;