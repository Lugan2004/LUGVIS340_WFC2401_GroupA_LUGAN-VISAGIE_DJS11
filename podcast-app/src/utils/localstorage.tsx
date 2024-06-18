// localStorage.ts

// Define the shape of an episode object
interface Episode {
    id: string;
    title: string;
    description: string;
    episode: number;
    file: string;
    // Add any other necessary properties
  }
  
  // Helper function to get favorites from local storage
  export const getFavorites = (): Episode[] => {
    if (typeof window !== 'undefined') {
      const favorites = window.localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    }
    return [];
  };
  
  // Helper function to save favorites to local storage
  export const saveFavorites = (favorites: Episode[]): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };
  
  // Function to add an episode to favorites
  export const addToFavorites = (episode: Episode): void => {
    const favorites = getFavorites();
    const existingFavorites = [...favorites];
    const existingIndex = existingFavorites.findIndex((fav) => fav.id === episode.id);
  
    if (existingIndex === -1) {
      existingFavorites.push(episode);
      saveFavorites(existingFavorites);
    }
  };
  
  // Function to remove an episode from favorites
  export const removeFromFavorites = (episodeId: string): void => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((fav) => fav.id !== episodeId);
    saveFavorites(updatedFavorites);
  };
  
  // Function to check if an episode is in favorites
  export const isFavorite = (episodeId: string): boolean => {
    const favorites = getFavorites();
    return favorites.some((fav) => fav.id === episodeId);
  };