import { Track } from '../interfaces/track.interface';
import { EMPTY_ALBUM, MOCK_ALBUM } from './album.mock';
import { EMPTY_ARTIST, MOCK_ARTIST } from './artist.mock';
import { EMPTY_EXTERNAL_IDS, MOCK_EXTERNAL_IDS } from './external-ids.mock';
import { EMPTY_EXTERNAL_URLS, MOCK_EXTERNAL_URLS } from './external-urls.mock';

export const EMPTY_TRACK: Track = {
  album: EMPTY_ALBUM,
  artists: [EMPTY_ARTIST],
  disc_number: 0,
  duration_ms: 0,
  explicit: false,
  external_ids: EMPTY_EXTERNAL_IDS,
  external_urls: EMPTY_EXTERNAL_URLS,
  href: '',
  id: '',
  is_local: false,
  is_playable: false,
  name: '',
  popularity: 0,
  preview_url: '',
  track_number: 0,
  type: '',
  uri: '',
};

export const MOCK_TRACK: Track = {
  album: MOCK_ALBUM,
  artists: [MOCK_ARTIST],
  disc_number: 1,
  duration_ms: 200000,
  explicit: false,
  external_ids: MOCK_EXTERNAL_IDS,
  external_urls: MOCK_EXTERNAL_URLS,
  href: 'https://api.spotify.com/v1/tracks/123456',
  id: '123456',
  is_local: false,
  is_playable: true,
  name: 'Track Name',
  popularity: 50,
  preview_url:
    'https://p.scdn.co/mp3-preview/abcdef1234567890abcdef1234567890abcdef12',
  track_number: 1,
  type: 'track',
  uri: 'spotify:track:123456',
};
