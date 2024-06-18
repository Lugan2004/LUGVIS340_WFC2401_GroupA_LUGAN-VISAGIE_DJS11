import React from 'react';

interface Episode {
  id: string;
  title: string;
  description: string;
  episode: number;
  file: string;
}

interface FavouritesBtnProps {
  episode: Episode;
  isFavorite: boolean;
  onToggleFavorite: (episode: Episode) => void;
}

const FavouritesBtn: React.FC<FavouritesBtnProps> = ({
  episode,
  isFavorite,
  onToggleFavorite,
}) => {
  const FavoriteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );

  const toggleFavorite = () => {
    onToggleFavorite(episode);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center ${
        isFavorite
          ? 'bg-gradient-to-r from-[#1A6DFF] to-[#C822FF]'
          : 'bg-zinc-700'
      } text-zinc-100 px-4 py-2 rounded-md shadow-md transition-colors duration-300 ml-4`}
    >
      <FavoriteIcon
        className={`w-6 h-6 mr-2 ${isFavorite ? 'fill-current' : ''}`}
      />
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavouritesBtn;