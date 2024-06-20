import React, { useState, useEffect } from 'react';
import PlayButton from './Playbutton';
import { isFavorite, addToFavorites, removeFromFavorites } from '@/utils/localstorage';

interface Episode {
  title: string;
  description: string;
  episode: number;
  file: string;
}

interface Season {
  season: number;
  title: string;
  image: string;
  episodes: Episode[];
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  seasons: Season[];
}

interface EpisodeCardProps {
  podcastId: string;
  season: number;
  episode: Episode;
  onPlay: (episode: Episode) => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  podcastId,
  season,
  episode,
  onPlay,
}) => {
  const [isFav, setIsFav] = useState<boolean>(isFavorite(podcastId, season, episode.episode));

  useEffect(() => {
    setIsFav(isFavorite(podcastId, season, episode.episode));
  }, [podcastId, season, episode.episode]);

  const handlePlay = () => {
    onPlay(episode);
  };

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(podcastId, season, episode.episode);
    } else {
      addToFavorites(podcastId, season, episode);
    }
    setIsFav(!isFav);
  };

  const FavoriteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold">{episode.title}</h3>
          <p className="text-sm text-zinc-400">Episode {episode.episode}</p>
        </div>
        <div className="flex items-center">
          <PlayButton onClick={handlePlay} />
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center ${
              isFav
                ? 'bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]'
                : 'bg-zinc-700 hover:bg-zinc-600'
            } text-zinc-100 px-4 py-2 rounded-md shadow-md transition-colors duration-300 ml-4`}
          >
            <FavoriteIcon
              className={`w-6 h-6 mr-2 ${isFav ? 'fill-current' : ''}`}
            />
            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
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