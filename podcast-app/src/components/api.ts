// api.ts

import { Podcast } from './types';

const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchAllPodcasts = async (): Promise<Podcast[]> => {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch podcasts');
  }
  return response.json();
};

export const fetchPodcastById = async (id: string): Promise<Podcast> => {
  const response = await fetch(`${BASE_URL}/id/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch podcast with id ${id}`);
  }
  return response.json();
};