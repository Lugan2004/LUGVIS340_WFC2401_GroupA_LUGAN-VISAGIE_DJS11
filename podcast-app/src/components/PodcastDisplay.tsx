import React, { useState } from 'react';
import Episodes from './episodes';

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

interface PodcastDisplayProps {
  initialPodcastData: PodcastData | null;
}

const PodcastDisplay: React.FC<PodcastDisplayProps> = ({ initialPodcastData }) => {
  const [podcastData, setPodcastData] = useState<PodcastData | null>(initialPodcastData);

  return (
    <div className="min-h-screen bg-zinc-900 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="flex w-full flex-col md:flex-row">
        <main className="flex-1 p-4">
          {podcastData && <Episodes podcastData={podcastData} />}
        </main>
      </div>
    </div>
  );
};

export default PodcastDisplay;