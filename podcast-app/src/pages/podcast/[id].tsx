import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import PodcastDisplay from '@/components/PodcastDisplay';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';

// Define the structure of the podcast data
interface PodcastData {
  id: string;
  title: string;
  description: string;
  seasons: Season[];
}

interface Season {
  season: number;
  title: string;
  image: string;
  episodes: Episode[];
}

interface Episode {
  title: string;
  description: string;
  episode: number;
  file: string;
}

// Define the props that the PodcastPage component will receive
interface PodcastPageProps {
  podcastData: PodcastData | null;
}

// Main PodcastPage component
const PodcastPage: React.FC<PodcastPageProps> = ({ podcastData }) => {
  // State to track if audio is currently playing
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Handler for when audio starts playing
  const handleAudioPlay = () => {
    setIsAudioPlaying(true);
  };

  // Handler for when audio is paused
  const handleAudioPause = () => {
    setIsAudioPlaying(false);
  };

  // Effect to add a warning when user tries to leave the page while audio is playing
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isAudioPlaying) {
        event.preventDefault();
        event.returnValue = ''; // For most browsers
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAudioPlaying]);

  // Render the Navbar and PodcastDisplay components
  return (
    <>
      <Navbar />
      <PodcastDisplay
        initialPodcastData={podcastData}
        onAudioPlay={handleAudioPlay}
        onAudioPause={handleAudioPause}
      />
    </>
  );
};

// Server-side data fetching
export const getServerSideProps: GetServerSideProps<PodcastPageProps> = async ({ query }) => {
  // Extract the podcast ID from the query parameters
  const { id } = query;

  try {
    if (id) {
      // Fetch podcast data from the API using the ID
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
      const data = await response.json();

      // Return the fetched data as props
      return {
        props: {
          podcastData: data || null,
        },
      };
    } else {
      // If no ID is provided, return null for podcastData
      return {
        props: {
          podcastData: null,
        },
      };
    }
  } catch (error) {
    // Log any errors and return null for podcastData
    console.error('Error fetching podcast data:', error);
    return {
      props: {
        podcastData: null,
      },
    };
  }
};

export default PodcastPage;