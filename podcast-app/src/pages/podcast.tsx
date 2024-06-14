import React, { useState, useEffect } from 'react';
import "../app/globals.css";

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

interface PodcastData {
  id: string;
  title: string;
  description: string;
  seasons: Season[];
}

const Podcast: React.FC = () => {
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcastData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/id/10716');
        const data = await response.json();

        if (data) {
          setPodcastData(data);
        } else {
          setError('Error fetching podcast data');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcastData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!podcastData) {
    return <div>No podcast data available</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 bg-white dark:bg-zinc-800 p-4">
          <h2 className="text-xl font-bold mb-4">Seasons</h2>
          <ul>
            {podcastData.seasons.map((season, index) => (
              <li key={index} className="mb-2">
                <a
                  href="#"
                  className={`block p-3 rounded ${index === 0
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                >
                  {season.title} ({season.episodes.length} episodes)
                </a>
              </li>
            ))}

          </ul>
        </aside>

        <main className="flex-1 p-4">
          <div className="flex items-center mb-4">
            <img
              src={podcastData.seasons[0].image}
              alt="Podcast Cover"
              className="w-24 h-24 mr-4 rounded"
            />
            <div>
              <h1 className="text-3xl font-bold">{podcastData.title}</h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {podcastData.description}
              </p>
            </div>
          </div>

          {podcastData.seasons.flatMap((season) =>
            season.episodes.map((episode, index) => (
              <div key={`${season.season}-${index}`} className="mb-4">
                <h2 className="text-xl font-bold">{episode.title}</h2>
                <div className="flex items-center mb-2">
                  <button className="flex items-center bg-zinc-800 text-white dark:bg-zinc-700 dark:text-zinc-200 px-4 py-2 rounded">
                    <span className="mr-2">❤️</span> Add to Favorites
                  </button>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                  {episode.description}
                </p>
                <audio controls className="w-full">
                  <source src={episode.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default Podcast;