import { Album } from '../interfaces/album.interface';
import { EMPTY_ARTIST, MOCK_ARTIST } from './artist.mock';
import { EMPTY_EXTERNAL_URLS, MOCK_EXTERNAL_URLS } from './external-urls.mock';
import { EMPTY_IMAGE, MOCK_IMAGE } from './image.mock';

export const EMPTY_ALBUM: Album = {
  album_type: '',
  artists: [EMPTY_ARTIST],
  available_markets: [],
  external_urls: EMPTY_EXTERNAL_URLS,
  href: '',
  id: '',
  images: [EMPTY_IMAGE],
  name: '',
  release_date: '',
  release_date_precision: '',
  total_tracks: 0,
  type: '',
  uri: '',
};

export const MOCK_ALBUM: Album = {
  album_type: 'album',
  artists: [MOCK_ARTIST],
  available_markets: ['US', 'CA'],
  external_urls: MOCK_EXTERNAL_URLS,
  href: 'https://api.spotify.com/v1/albums/4bEcoz1OcfMgUbp2ft8ieQ',
  id: '4bEcoz1OcfMgUbp2ft8ieQ',
  images: [MOCK_IMAGE],
  name: 'A Night at the Opera',
  release_date: '1975-11-21',
  release_date_precision: 'day',
  total_tracks: 12,
  type: 'album',
  uri: 'spotify:album:4bEcoz1OcfMgUbp2ft8ieQ',
};
