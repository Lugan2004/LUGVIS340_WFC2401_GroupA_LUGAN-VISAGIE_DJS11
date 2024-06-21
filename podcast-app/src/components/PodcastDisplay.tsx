import React, { useEffect, useState } from 'react';
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
  onAudioPlay: () => void;
  onAudioPause: () => void;
}

const PodcastDisplay: React.FC<PodcastDisplayProps> = ({ initialPodcastData, onAudioPlay, onAudioPause }) => {
  const [podcastData, setPodcastData] = useState<PodcastData | null>(initialPodcastData);

  useEffect(() => {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audio) => {
      audio.addEventListener('play', onAudioPlay);
      audio.addEventListener('pause', onAudioPause);
    });

    return () => {
      audioElements.forEach((audio) => {
        audio.removeEventListener('play', onAudioPlay);
        audio.removeEventListener('pause', onAudioPause);
      });
    };
  }, [onAudioPlay, onAudioPause]);

  return (
    <div className="min-h-screen bg-zinc-900 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="flex w-full flex-col md:flex-row">
        <main className="flex-1 p-4">
          {podcastData && <Episodes />}
        </main>
      </div>
    </div>
  );
};

export default PodcastDisplay;
