import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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

const PodcastDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);

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

  const handleSeasonClick = (season: Season) => {
    setSelectedSeason(season);
  };

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
                                    className={`block p-3 rounded ${season === selectedSeason
                                            ? 'bg-blue-500 text-white'
                                            : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'
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
              <h1 className="text-4xl font-bold mb-2">{podcastData.title}</h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {podcastData.description}
              </p>
            </div>
          </div>

          {selectedSeason && (
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {selectedSeason.title} ({selectedSeason.episodes.length} episodes)
              </h2>
              {selectedSeason.episodes.map((episode, index) => (
                <div
                  key={`${selectedSeason.season}-${index}`}
                  className="mb-8 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">{episode.title}</h3>
                    <button className="flex items-center bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-md shadow-md">
                      <FavoriteIcon className="w-6 h-6 mr-2" />
                      Add to Favorites
                    </button>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {episode.description}
                  </p>
                  <audio controls className="w-full">
                    <source src={episode.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const FavoriteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

export default PodcastDetails;