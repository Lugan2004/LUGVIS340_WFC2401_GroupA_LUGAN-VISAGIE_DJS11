import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SortingBar from './SortingBar';
import ListenNowButton from './ListenNowBtn';
import Fuse from 'fuse.js';
import Image from 'next/image';

// Define the structure of a Podcast object
interface Podcast {
  id: string;
  title: string;
  seasons: number;
  genres: number[];
  updated: Date;
  image: string;
}

// Map of genre IDs to genre names
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

// Props for the PodcastCards component
interface PodcastCardsProps {
  setIsLoading: (isLoading: boolean) => void;
}

// Styled components for layout and design
const PodcastCardsContainer = styled.div`
  background: #141414;
  min-height: 100vh;
  padding: 2rem;
`;

const PodcastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PodcastCard = styled.div`
  background: #242323;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const PodcastImageContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
`;

const PodcastTitle = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const PodcastInfo = styled.p`
  color: #b3b3b3;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

// Main PodcastCards component
const PodcastCards: React.FC<PodcastCardsProps> = ({ setIsLoading }) => {
  // State for all podcasts and filtered podcasts
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Effect to fetch podcasts when component mounts
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        const data = await response.json();
        // Map genre IDs to names and parse dates
        const podcastsWithGenreNames = data.map((podcast: Podcast) => ({
          ...podcast,
          genres: podcast.genres.map((genreId) => genreMap[genreId] || genreId),
          updated: new Date(podcast.updated),
        }));
        
        // Sort podcasts alphabetically by title
        const sortedPodcasts = podcastsWithGenreNames.sort((a: { title: string }, b: { title: string }) => 
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

  // Effect to handle search functionality using Fuse.js
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

  // Render the component
  return (
    <PodcastCardsContainer>
      <SortingBar
        podcasts={podcasts}
        onSort={(sortedPodcasts) => setFilteredPodcasts(sortedPodcasts)}
        onFilter={(filteredPodcasts) => setFilteredPodcasts(filteredPodcasts)}
      />
      <PodcastGrid>
        {filteredPodcasts.map((podcast) => (
          <PodcastCard key={podcast.id}>
            <PodcastImageContainer>
              <Image
                src={podcast.image}
                alt={podcast.title}
                layout="fill"
                objectFit="cover"
              />
            </PodcastImageContainer>
            <PodcastTitle>{podcast.title}</PodcastTitle>
            <PodcastInfo>Seasons: {podcast.seasons}</PodcastInfo>
            <PodcastInfo>
              Genres: {podcast.genres.join(', ')}
            </PodcastInfo>
            <PodcastInfo>
              Last Updated:{' '}
              {podcast.updated.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </PodcastInfo>
            <ListenNowButton podcastId={podcast.id} />
          </PodcastCard>
        ))}
      </PodcastGrid>
    </PodcastCardsContainer>
  );
};

export default PodcastCards;