import React, { useState, useEffect } from 'react';
import SortingBar from './SortingBar';

interface Podcast {
  id: string;
  title: string;
  seasons: number;
  genres: number[];
  updated: Date;
  image: string;
}
const genreMap: { [key: number]: string } = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

const PodcastCards: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        const data = await response.json();

        const podcastsWithGenreNames = data.map((podcast: Podcast) => ({
          ...podcast,
          genres: podcast.genres.map((genreId) => genreMap[genreId] || genreId),
          updated: new Date(podcast.updated),
        }));

        setPodcasts(podcastsWithGenreNames);
        setFilteredPodcasts(podcastsWithGenreNames);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div>
      <SortingBar
        podcasts={podcasts}
        onSort={(sortedPodcasts) => setFilteredPodcasts(sortedPodcasts)}
        onFilter={(filteredPodcasts) => setFilteredPodcasts(filteredPodcasts)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPodcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-zinc-900 text-white rounded-lg shadow-md overflow-hidden"
          >
              <img src={podcast.image} alt={podcast.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{podcast.title}</h2>
              <p className="text-white mb-1">Seasons: {podcast.seasons}</p>
              <p className="text-white mb-1">
                Genres: {podcast.genres.map((genre) => genreMap[genre] || genre).join(', ')}
              </p>
              <p className="text-white mb-4">
                Last Updated: {podcast.updated.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <button className="bg-zinc-700 text-white py-3 px-6 rounded-md mb-4 font-semibold border-2 border-gradient-to-r">
                Listen Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastCards;