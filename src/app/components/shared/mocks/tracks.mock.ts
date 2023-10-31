import { Tracks } from '../interfaces/tracks.interface';
import { filledTrack } from './track.mock';

// Empty Mock
export const emptyTracks: Tracks = {
  href: '',
  items: [],
  limit: 0,
  next: '',
  offset: 0,
  previous: '',
  total: 0,
};

// Filled Mock
export const filledTracks: Tracks = {
  href: 'https://api.spotify.com/v1/albums/12345/tracks',
  items: [filledTrack],
  limit: 10,
  next: 'https://api.spotify.com/v1/albums/12345/tracks?offset=10',
  offset: 0,
  previous: '',
  total: 12,
};
