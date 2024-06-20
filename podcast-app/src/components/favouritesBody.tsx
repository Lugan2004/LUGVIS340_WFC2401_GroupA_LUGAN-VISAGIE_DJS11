import React, { useEffect, useState } from 'react';
import { getFavorites, removeFromFavorites, removeAllFavorites } from '@/utils/localstorage';
import { fetchAllPodcasts, fetchPodcastById } from './api';
import { Podcast } from '@/components/types';

interface Episode {
  id: string;
  title: string;
  description: string;
  episode: number;
  file: string;
  podcastId: string;
  seasonNumber: number;
  addedAt: number;
}

interface GroupedEpisodes {
  [podcastId: string]: {
    podcastTitle: string;
    seasons: {
      [seasonNumber: number]: Episode[];
    };
  };
}

type SortOption = 'recently-added' | 'newest' | 'oldest' | 'a-z' | 'z-a';

const FavouritesBody: React.FC = () => {
  const [favorites, setFavorites] = useState<Episode[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('recently-added');
  const [groupedEpisodes, setGroupedEpisodes] = useState<GroupedEpisodes>({});
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedFavorites = getFavorites();
      setFavorites(storedFavorites);

      const allPodcasts = await fetchAllPodcasts();
      setPodcasts(allPodcasts);

      const grouped = await groupEpisodes(storedFavorites);
      setGroupedEpisodes(grouped);
    };

    fetchData();
  }, []);

  const groupEpisodes = async (episodes: Episode[]): Promise<GroupedEpisodes> => {
    const grouped: GroupedEpisodes = {};

    for (const episode of episodes) {
      if (!grouped[episode.podcastId]) {
        const podcast = podcasts.find(p => p.id === episode.podcastId) || await fetchPodcastById(episode.podcastId);
        grouped[episode.podcastId] = {
          podcastTitle: podcast.title,
          seasons: {}
        };
      }

      if (!grouped[episode.podcastId].seasons[episode.seasonNumber]) {
        grouped[episode.podcastId].seasons[episode.seasonNumber] = [];
      }

      grouped[episode.podcastId].seasons[episode.seasonNumber].push(episode);
    }

    return grouped;
  };

  const handleRemoveFavorite = (episode: Episode) => {
    removeFromFavorites(episode.podcastId, episode.seasonNumber, episode.episode);
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => 
        fav.podcastId !== episode.podcastId || 
        fav.seasonNumber !== episode.seasonNumber || 
        fav.episode !== episode.episode
      )
    );
    setGroupedEpisodes((prevGrouped) => {
      const newGrouped = { ...prevGrouped };
      newGrouped[episode.podcastId].seasons[episode.seasonNumber] = 
        newGrouped[episode.podcastId].seasons[episode.seasonNumber].filter(
          (e) => e.episode !== episode.episode
        );
      if (newGrouped[episode.podcastId].seasons[episode.seasonNumber].length === 0) {
        delete newGrouped[episode.podcastId].seasons[episode.seasonNumber];
      }
      if (Object.keys(newGrouped[episode.podcastId].seasons).length === 0) {
        delete newGrouped[episode.podcastId];
      }
      return newGrouped;
    });
  };

  const handleRemoveAll = () => {
    removeAllFavorites();
    setFavorites([]);
    setGroupedEpisodes({});
  };

  const sortEpisodes = (episodes: Episode[], option: SortOption): Episode[] => {
    switch (option) {
      case 'a-z':
        return [...episodes].sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a':
        return [...episodes].sort((a, b) => b.title.localeCompare(a.title));
      case 'newest':
        return [...episodes].sort((a, b) => b.episode - a.episode);
      case 'oldest':
        return [...episodes].sort((a, b) => a.episode - b.episode);
      case 'recently-added':
        return [...episodes].sort((a, b) => b.addedAt - a.addedAt);
      default:
        return episodes;
    }
  };

  const sortGroupedEpisodes = (grouped: GroupedEpisodes, option: SortOption): GroupedEpisodes => {
    const sortedGrouped: GroupedEpisodes = {};
    
    const sortedPodcastIds = Object.keys(grouped).sort((a, b) => {
      switch (option) {
        case 'a-z':
          return grouped[a].podcastTitle.localeCompare(grouped[b].podcastTitle);
        case 'z-a':
          return grouped[b].podcastTitle.localeCompare(grouped[a].podcastTitle);
        case 'newest':
        case 'oldest':
          const aDate = Math.max(...Object.values(grouped[a].seasons).flat().map(e => e.addedAt));
          const bDate = Math.max(...Object.values(grouped[b].seasons).flat().map(e => e.addedAt));
          return option === 'newest' ? bDate - aDate : aDate - bDate;
        case 'recently-added':
          const aRecent = Math.max(...Object.values(grouped[a].seasons).flat().map(e => e.addedAt));
          const bRecent = Math.max(...Object.values(grouped[b].seasons).flat().map(e => e.addedAt));
          return bRecent - aRecent;
        default:
          return 0;
      }
    });

    for (const podcastId of sortedPodcastIds) {
      sortedGrouped[podcastId] = {
        podcastTitle: grouped[podcastId].podcastTitle,
        seasons: {}
      };

      const sortedSeasonNumbers = Object.keys(grouped[podcastId].seasons)
        .map(Number)
        .sort((a, b) => b - a);

      for (const seasonNumber of sortedSeasonNumbers) {
        sortedGrouped[podcastId].seasons[seasonNumber] = sortEpisodes(
          grouped[podcastId].seasons[seasonNumber],
          option
        );
      }
    }

    return sortedGrouped;
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setGroupedEpisodes((prevGrouped) => sortGroupedEpisodes(prevGrouped, option));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const sortOptions: SortOption[] = ['recently-added', 'newest', 'oldest', 'a-z', 'z-a'];

  return (
    <div className="bg-zinc-900 text-zinc-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
          Favorite Episodes
        </h2>
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSortChange(option)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  sortOption === option
                    ? 'bg-gradient-to-r from-[#1A6DFF] to-[#C822FF] text-white shadow-lg scale-105'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:shadow-md'
                }`}
              >
                {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
          {favorites.length > 2 && (
            <button
              onClick={handleRemoveAll}
              className="w-full bg-red-500 text-white px-4 py-3 rounded-md shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
            >
              Remove All Favorites
            </button>
          )}
        </div>
        {Object.keys(groupedEpisodes).length > 0 ? (
          <div className="space-y-10">
            {Object.entries(groupedEpisodes).map(([podcastId, podcastData], showIndex) => (
              <div key={podcastId} className="bg-zinc-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
                  Show {showIndex + 1}: {podcastData.podcastTitle}
                </h3>
                {Object.entries(podcastData.seasons).map(([seasonNumber, episodes], seasonIndex) => (
                  <div key={`${podcastId}-${seasonNumber}`} className="mb-6 last:mb-0">
                    <h4 className="text-xl font-semibold mb-4 text-zinc-300">Season {seasonNumber}</h4>
                    <ul className="space-y-4">
                      {episodes.map((episode, episodeIndex) => (
                        <li
                          key={`${episode.podcastId}-${episode.seasonNumber}-${episode.episode}`}
                          className="bg-zinc-700 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                        >
                          <div>
                            <h5 className="text-lg font-bold mb-2">
                              Episode {episodeIndex + 1}: {episode.title}
                            </h5>
                            <p className="text-zinc-400 text-sm mb-2">{episode.description}</p>
                            <p className="text-zinc-500 text-xs">
                              Show {showIndex + 1}, Season {seasonNumber}, Episode {episode.episode} | Added on: {formatDate(episode.addedAt)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveFavorite(episode)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400 text-lg">No favorite episodes yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavouritesBody;