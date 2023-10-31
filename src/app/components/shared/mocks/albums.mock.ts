import { Albums } from '../interfaces/albums.interface';
import { filledAlbum } from './album.mock';

// Empty Mock
export const emptyAlbums: Albums = {
  href: '',
  items: [],
  limit: 0,
  next: '',
  offset: 0,
  previous: '',
  total: 0,
};

// Filled Mock
export const filledAlbums: Albums = {
  href: 'https://api.spotify.com/v1/albums',
  items: [filledAlbum],
  limit: 10,
  next: 'https://api.spotify.com/v1/albums?offset=10',
  offset: 0,
  previous: '',
  total: 20,
};
