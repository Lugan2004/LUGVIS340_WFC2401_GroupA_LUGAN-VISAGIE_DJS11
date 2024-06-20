// localStorage.ts

interface Episode {
  title: string;
  description: string;
  episode: number;
  file: string;
}

interface FavoriteEpisode extends Episode {
  podcastId: string;
  season: number;
}

export const getFavorites = (): FavoriteEpisode[] => {
  if (typeof window !== 'undefined') {
    const favorites = window.localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
  return [];
};

const saveFavorites = (favorites: FavoriteEpisode[]): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const addToFavorites = (podcastId: string, season: number, episode: Episode): void => {
  const favorites = getFavorites();
  const favoriteEpisode: FavoriteEpisode = { ...episode, podcastId, season };
  const updatedFavorites = [...favorites, favoriteEpisode];
  saveFavorites(updatedFavorites);
};

export const removeFromFavorites = (podcastId: string, season: number, episodeNumber: number): void => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(
    (fav) => !(fav.podcastId === podcastId && fav.season === season && fav.episode === episodeNumber)
  );
  saveFavorites(updatedFavorites);
};

export const isFavorite = (podcastId: string, season: number, episodeNumber: number): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => 
    fav.podcastId === podcastId && fav.season === season && fav.episode === episodeNumber
  );
};