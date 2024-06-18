import React, { useState } from 'react';
import Fuse from 'fuse.js';

interface Podcast {
  id: string;
  title: string;
  seasons: number;
  genres: number[];
  updated: Date;
  image: string;
}

interface SortingBarProps {
  podcasts: Podcast[];
  onSort: (sortedPodcasts: Podcast[]) => void;
  onFilter: (filteredPodcasts: Podcast[]) => void;
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

const SortingBar: React.FC<SortingBarProps> = ({ podcasts, onSort, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSort = (sortOrder: string) => {
    let sortedPodcasts = [...podcasts];

    switch (sortOrder) {
      case 'a-z':
        sortedPodcasts = [...podcasts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case 'z-a':
        sortedPodcasts = [...podcasts].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case 'newest':
        sortedPodcasts = [...podcasts].sort(
          (a, b) => b.updated.getTime() - a.updated.getTime()
        );
        break;
      case 'oldest':
        sortedPodcasts = [...podcasts].sort(
          (a, b) => a.updated.getTime() - b.updated.getTime()
        );
        break;
      default:
        break;
    }

    onSort(sortedPodcasts);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue.trim() === '') {
      onFilter(podcasts);
      return;
    }

    const fuse = new Fuse(podcasts, {
      keys: ['title'],
      threshold: 0.3,
    });
    const results = fuse.search(searchValue);
    const filteredPodcasts = results.map(result => result.item);
    onFilter(filteredPodcasts);
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-lg flex space-x-4 border-b-4 border-t-4 border-gradient-to-r items-center justify-between">
      <div className="flex space-x-4">
        <button
          className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md shadow active:bg-zinc-800"
          onClick={() => handleSort('')}
        >
          All
        </button>
        <button
          className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md active:bg-zinc-800"
          onClick={() => handleSort('a-z')}
        >
          A-Z
        </button>
        <button
          className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md active:bg-zinc-800"
          onClick={() => handleSort('z-a')}
        >
          Z-A
        </button>
        <button
          className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md active:bg-zinc-800"
          onClick={() => handleSort('newest')}
        >
          Newest
        </button>
        <button
          className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md active:bg-zinc-800"
          onClick={() => handleSort('oldest')}
        >
          Oldest
        </button>
      </div>
      <div className="relative w-full max-w-xs ml-auto">
        <input
          type="text"
          placeholder="Search..."
          className="py-2 px-4 rounded-md bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
    </div>
  );
};

export default SortingBar;
