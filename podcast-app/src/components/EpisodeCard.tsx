import React, { useState, useEffect } from 'react';
import PlayButton from './Playbutton';
import { isFavorite, addToFavorites, removeFromFavorites } from '@/utils/localstorage';
import { Episode, Podcast, Season } from './types';

interface EpisodeCardProps {
  podcast?: Podcast;
  season?: Season;
  episode?: Episode;
  onPlay: (episode: Episode) => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  podcast,
  season,
  episode,
  onPlay,
}) => {
  const [isFav, setIsFav] = useState<boolean>(false);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);

  useEffect(() => {
    if (podcast?.id && season?.season && episode?.episode) {
      setIsFav(isFavorite(podcast.id, season.season, episode.episode));
    }
  }, [podcast?.id, season?.season, episode?.episode]);

  const handlePlay = () => {
    if (episode) {
      onPlay(episode);
    }
  };

  const handleToggleFavorite = () => {
    if (!podcast?.id || !season?.season || !episode?.episode) return;

    if (isFav) {
      removeFromFavorites(podcast.id, season.season, episode.episode);
    } else {
      addToFavorites({
        podcastId: podcast.id,
        seasonNumber: season.season,
        ...episode,
      });
    }
    setIsFav(!isFav);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const FavoriteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isFav ? "currentColor" : "none"}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 21.29l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.47L12 21.29z"
      />
    </svg>
  );

  if (!podcast || !season || !episode) {
    return null; // or return a loading state or error message
  }

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="sm:mr-4">
          <h3 className="text-2xl font-bold">{episode.title}</h3>
          <p className="text-sm text-zinc-400">
            {podcast.title} - {season.title}, Episode {episode.episode}
          </p>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <PlayButton onClick={handlePlay} />
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center ${
              isFav
                ? 'bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]'
                : 'bg-zinc-700 hover:bg-zinc-600'
            } text-zinc-100 px-4 py-2 rounded-md shadow-md transition-colors duration-300 ml-4`}
          >
            <FavoriteIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="sm:flex sm:items-start">
        <p className={`text-zinc-400 mb-4 ${!showFullDescription ? 'max-h-16 overflow-hidden' : ''}`}>
          {episode.description}
        </p>
        {episode.description.length > 200 && (
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:text-blue-700"
          >
            {showFullDescription ? 'See less' : 'See more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default EpisodeCard;
