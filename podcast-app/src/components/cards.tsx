import React, { useState, useEffect } from 'react';
import SortingBar from './SortingBar';
import ListenNowButton from './ListenNowBtn';
import Fuse from 'fuse.js';

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

interface PodcastCardsProps {
  setIsLoading: (isLoading: boolean) => void;
}

const PodcastCards: React.FC<PodcastCardsProps> = ({ setIsLoading }) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

        // Sort podcasts alphabetically by title
        const sortedPodcasts = podcastsWithGenreNames.sort((a: { title: string }, b: { title: any }) =>
          a.title.localeCompare(b.title)
        );

        setPodcasts(sortedPodcasts);
        setFilteredPodcasts(sortedPodcasts);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPodcasts();
  }, [setIsLoading]);

  useEffect(() => {
    const fuse = new Fuse(podcasts, {
      keys: ['title', 'genres'],
      threshold: 0.3,
    });

    if (searchTerm) {
      const results = fuse.search(searchTerm);
      setFilteredPodcasts(results.map(result => result.item));
    } else {
      setFilteredPodcasts(podcasts);
    }
  }, [searchTerm, podcasts]);

  return (
    <div>
      <SortingBar
        podcasts={podcasts}
        onSort={(sortedPodcasts) => setFilteredPodcasts(sortedPodcasts)}
        onFilter={(filteredPodcasts) => setFilteredPodcasts(filteredPodcasts)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
        {filteredPodcasts.map((podcast) => (
          <div
            key={podcast.id}
            className="bg-gradient-to-br from-zinc-800 to-zinc-900 text-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <img
              src={podcast.image}
              alt={podcast.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{podcast.title}</h2>
              <p className="text-gray-300 mb-1">Seasons: {podcast.seasons}</p>
              <p className="text-gray-300 mb-1">
                Genres: {podcast.genres.map((genre) => genreMap[genre] || genre).join(', ')}
              </p>
              <p className="text-gray-300 mb-4">
                Last Updated: {podcast.updated.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className="flex justify-start items-center my-auto">
                <ListenNowButton podcastId={podcast.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastCards;
