import React from 'react';

interface AudioPlayerProps {
  episodeFile: string;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ episodeFile, onClose }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 p-4 flex items-center justify-between shadow-md">
      <audio controls autoPlay className="w-full">
        <source src={episodeFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={onClose}
        className="text-white ml-4 hover:text-gray-300 focus:outline-none"
        aria-label="Close audio player"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default AudioPlayer;