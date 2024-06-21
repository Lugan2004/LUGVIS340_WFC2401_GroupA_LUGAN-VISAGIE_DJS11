import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EpisodeCard from './EpisodeCard';
import AudioPlayer from './AudioPlayer';

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
            setSelectedSeason(data.seasons[0]);
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
    return <div className="text-white">Error: {error}</div>;
  }

  if (!podcastData) {
    return <div className="text-white">No podcast data available. Please check your internet connection.</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-1/4 bg-zinc-800 p-4 lg:min-h-screen">
          <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
            Seasons
          </h2>
          <ul className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
            {podcastData.seasons.map((season, index) => (
              <li key={index} className="mb-2 mr-2 lg:mr-0 flex-shrink-0 lg:flex-shrink">
                <button
                  className={`block w-full p-3 rounded transition-colors duration-300 whitespace-nowrap lg:whitespace-normal ${
                    season === selectedSeason
                      ? 'bg-gradient-to-r from-[#1A6DFF] to-[#C822FF] text-white'
                      : 'bg-zinc-700 hover:bg-zinc-600'
                  }`}
                  onClick={() => setSelectedSeason(season)}
                >
                  {season.title} ({season.episodes.length})
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row items-center mb-8">
            <img
              src={podcastData.seasons[0].image}
              alt="Podcast Cover"
              className="w-32 h-32 mb-4 sm:mb-0 sm:mr-8 rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
                {podcastData.title}
              </h1>
              <p className="text-zinc-400 text-center sm:text-left">{podcastData.description}</p>
            </div>
          </div>

          {selectedSeason && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]">
                {selectedSeason.title} ({selectedSeason.episodes.length} episodes)
              </h2>
              <div className="grid gap-6">
                {selectedSeason.episodes.map((episode, index) => (
                  <EpisodeCard
                    key={`${selectedSeason.season}-${index}`}
                    podcast={podcastData}
                    season={selectedSeason}
                    episode={episode}
                    onPlay={handleEpisodePlay}
                  />
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