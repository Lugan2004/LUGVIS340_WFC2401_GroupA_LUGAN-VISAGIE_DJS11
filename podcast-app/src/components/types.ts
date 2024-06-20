// types.ts

export interface Episode {
    title: string;
    description: string;
    episode: number;
    file: string;
  }
  
  export interface Season {
    season: number;
    title: string;
    image: string;
    episodes: Episode[];
  }
  
  export interface Podcast {
    id: string;
    title: string;
    description: string;
    seasons: Season[];
  }
  
  export interface PodcastPreview {
    id: string;
    title: string;
    description: string;
    image: string;
    seasons: number;
    genres: number[];
    updated: string;
  }
  
  export interface FavoriteEpisode extends Episode {
    podcastId: string;
    seasonNumber: number;
  }