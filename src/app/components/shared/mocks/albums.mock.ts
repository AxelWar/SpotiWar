import { Albums } from '../interfaces/albums.interface';
import { EMPTY_ALBUM, MOCK_ALBUM } from './album.mock';

export const EMPTY_ALBUMS: Albums = {
  href: '',
  items: [EMPTY_ALBUM],
  limit: 0,
  next: '',
  offset: 0,
  previous: null,
  total: 0,
};

export const MOCK_ALBUMS: Albums = {
  href: 'https://api.spotify.com/v1/browse/new-releases',
  items: [MOCK_ALBUM],
  limit: 20,
  next: 'https://api.spotify.com/v1/browse/new-releases?offset=20',
  offset: 0,
  previous: null,
  total: 500,
};
