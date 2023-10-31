import { Artist } from '../interfaces/artist.interface';
import { EMPTY_EXTERNAL_URLS, MOCK_EXTERNAL_URLS } from './external-urls.mock';

export const EMPTY_ARTIST: Artist = {
  external_urls: EMPTY_EXTERNAL_URLS,
  href: '',
  id: '',
  name: '',
  type: '',
  uri: '',
};

export const MOCK_ARTIST: Artist = {
  external_urls: MOCK_EXTERNAL_URLS,
  href: 'https://api.spotify.com/v1/artists/5lsC3H1vh9YSRQckyGv0Up',
  id: '5lsC3H1vh9YSRQckyGv0Up',
  name: 'Queen',
  type: 'artist',
  uri: 'spotify:artist:5lsC3H1vh9YSRQckyGv0Up',
};
