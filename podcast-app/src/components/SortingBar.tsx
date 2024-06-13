import React, { useState } from 'react';

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
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const handleSort = (sortOrder: string) => {
    switch (sortOrder) {
      case 'a-z':
        const sortedPodcastsAToZ = [...podcasts].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        onSort(sortedPodcastsAToZ);
        break;
      case 'z-a':
        const sortedPodcastsZToA = [...podcasts].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        onSort(sortedPodcastsZToA);
        break;
      case 'newest':
        const sortedNewestPodcasts = [...podcasts].sort(
          (a, b) => b.updated.getTime() - a.updated.getTime()
        );
        onSort(sortedNewestPodcasts);
        break;
      case 'oldest':
        const sortedOldestPodcasts = [...podcasts].sort(
          (a, b) => a.updated.getTime() - b.updated.getTime()
        );
        onSort(sortedOldestPodcasts);
        break;
      default:
        onSort(podcasts);
        break;
    }
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);

    if (genre === '') {
      onFilter(podcasts);
    } else {
      const filteredByGenre = podcasts.filter((podcast) =>
        podcast.genres.map((genreId) => genreMap[genreId]).includes(genre)
      );
      onSort(filteredByGenre);
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-lg flex space-x-4 border-b-4 border-t-4 border-gradient-to-r">
      <button
        className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md shadow active:bg-zinc-800"
        onClick={() => handleSort('')}
      >
        All
      </button>
      <button
        className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md  active:bg-zinc-800"
        onClick={() => handleSort('a-z')}
      >
        A-Z
      </button>
      <button
        className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md  active:bg-zinc-800"
        onClick={() => handleSort('z-a')}
      >
        Z-A
      </button>
      <button
        className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md  active:bg-zinc-800"
        onClick={() => handleSort('newest')}
      >
        Newest
      </button>
      <button
        className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md  active:bg-zinc-800"
        onClick={() => handleSort('oldest')}
      >
        Oldest
      </button>
      <select
        className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-md  active:bg-zinc-800"
        value={selectedGenre}
        onChange={(e) => handleGenreChange(e.target.value)}
      >
        <option value="">All Genres</option>
        {Object.values(genreMap).map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortingBar;