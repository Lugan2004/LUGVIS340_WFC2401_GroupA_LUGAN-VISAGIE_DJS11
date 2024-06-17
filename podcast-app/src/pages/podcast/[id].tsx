import { GetServerSideProps } from 'next';
import PodcastDisplay from '@/components/PodcastDisplay';
import "@/app/globals.css"
import Navbar from '@/components/Navbar';

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

interface PodcastPageProps {
  podcastData: PodcastData | null;
}

const PodcastPage: React.FC<PodcastPageProps> = ({ podcastData }) => {
  return (
    <>
    <Navbar />
    <PodcastDisplay initialPodcastData={podcastData} />
    </>
    
  );
};

export const getServerSideProps: GetServerSideProps<PodcastPageProps> = async ({ query }) => {
  const { id } = query;

  try {
    if (id) {
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
      const data = await response.json();

      return {
        props: {
          podcastData: data || null,
        },
      };
    } else {
      return {
        props: {
          podcastData: null,
        },
      };
    }
  } catch (error) {
    console.error('Error fetching podcast data:', error);
    return {
      props: {
        podcastData: null,
      },
    };
  }
};

export default PodcastPage;