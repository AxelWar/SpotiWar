import { Tracks } from '../interfaces/tracks.interface';
import { EMPTY_TRACK, MOCK_TRACK } from './track.mock';

export const EMPTY_TRACKS: Tracks = {
  href: '',
  items: [EMPTY_TRACK],
  limit: 0,
  next: '',
  offset: 0,
  previous: null,
  total: 0,
};

export const MOCK_TRACKS: Tracks = {
  href: 'https://api.spotify.com/v1/albums/12345/tracks',
  items: [MOCK_TRACK],
  limit: 10,
  next: 'https://api.spotify.com/v1/albums/12345/tracks?offset=10',
  offset: 0,
  previous: null,
  total: 10,
};
