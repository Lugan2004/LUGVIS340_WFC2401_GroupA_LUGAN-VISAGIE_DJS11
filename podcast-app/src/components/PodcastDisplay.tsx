import React from 'react';
import Episodes from './episodes';


const PodcastDisplay = () => {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="flex w-full flex-col md:flex-row">
        <main className="flex-1 p-4">
          <Episodes />
        </main>
      </div>
    </div>
  );
};

export default PodcastDisplay;