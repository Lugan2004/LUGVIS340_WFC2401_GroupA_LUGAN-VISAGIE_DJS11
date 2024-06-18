import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FavouritesBtn from './favouritesBtn';
import { addToFavorites, removeFromFavorites, getFavorites, isFavorite } from "@/utils/localstorage";

interface Episode {
  id: string;
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

interface PodcastData {
  id: string;
  title: string;
  description: string;
  seasons: Season[];
}

const AudioPlayer: React.FC<{ episodeFile: string; onClose: () => void }> = ({ episodeFile, onClose }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 p-4 flex items-center justify-between shadow-md">
    <audio controls autoPlay className="w-full">
      <source src={episodeFile} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <button
      onClick={onClose}
      className="text-white ml-4 hover:text-gray-300 focus:outline-none"
      aria-label="Close audio player"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

const PlayButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
    onClick={onClick}
    className="bg-gradient-to-r from-[#1A6DFF] to-[#C822FF] text-white px-4 py-2 rounded-lg shadow-md flex items-center justify-center"
  >
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
    </svg>
    <span className="ml-2">Play Episode</span>
  </button>
);

const PodcastDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [audioPlayerVisible, setAudioPlayerVisible] = useState(false);


  useEffect(() => {
    const fetchPodcastData = async () => {
      try {
        if (id) {
          const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
          const data = await response.json();

          if (data) {
            setPodcastData(data);
            setSelectedSeason(data.seasons[0]); // Set the first season as the initial selected season
          } else {
            setError('Error fetching podcast data');
          }
        } else {
          setError('Invalid podcast ID');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcastData();
  }, [id]);

  const handleAddToFavorites = (episode: Episode) => {
    addToFavorites(episode);
  };

  const handleRemoveFromFavorites = (episodeId: string) => {
    removeFromFavorites(episodeId);
  };

  const handleSeasonClick = (season: Season) => {
    setSelectedSeason(season);
  };

  const handleEpisodePlay = (episode: Episode) => {
    setSelectedEpisode(episode);
    setAudioPlayerVisible(true);
  };

  const handleCloseAudioPlayer = () => {
    setAudioPlayerVisible(false);
    setSelectedEpisode(null);
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!podcastData) {
    return <div className="text-white">No podcast data available. Please check your internet connection.</div>;
  }

  return (
     <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 bg-zinc-800 p-4">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
            Seasons
          </h2>
          <ul>
            {podcastData.seasons.map((season, index) => (
              <li key={index} className="mb-2">
                <a
                  className={`block p-3 rounded transition-colors duration-300 ${season === selectedSeason
                    ? 'bg-gradient-to-r from-[#1A6DFF] to-[#C822FF] text-white'
                    : 'bg-zinc-700 hover:bg-zinc-600'
                  }`}
                  onClick={() => handleSeasonClick(season)}
                >
                  {season.title} ({season.episodes.length} episodes)
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-4">
          <div className="flex items-center mb-8">
            <img
              src={podcastData.seasons[0].image}
              alt="Podcast Cover"
              className="w-32 h-32 mr-8 rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
                {podcastData.title}
              </h1>
              <p className="text-zinc-400">{podcastData.description}</p>
            </div>
          </div>


      {selectedSeason && (
        <div>
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
                {selectedSeason.title} ({selectedSeason.episodes.length} episodes)
              </h2>
              <div className="grid gap-6">
            {selectedSeason.episodes.map((episode, index) => (
              <div key={`${selectedSeason.season}-${index}`} className="bg-zinc-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{episode.title}</h3>
                  <div className="flex items-center">
                    <PlayButton onClick={() => handleEpisodePlay(episode)} />
                    <FavouritesBtn
                      episode={episode}
                      isFavorite={isFavorite(episode.id)}
                      onAddToFavorites={handleAddToFavorites}
                      onRemoveFromFavorites={handleRemoveFromFavorites}
                    />
                  </div>
                </div>
                <p className="text-zinc-400 mb-4">{episode.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

          {audioPlayerVisible && selectedEpisode && (
            <AudioPlayer episodeFile={selectedEpisode.file} onClose={handleCloseAudioPlayer} />
          )}
        </main>
      </div>
    </div>
  );
};

export default PodcastDetails;