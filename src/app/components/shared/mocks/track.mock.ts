import { Track } from '../interfaces/track.interface';
import { filledArtist } from './artist.interface';

// Empty Mock
export const emptyTrack: Track = {
  artists: [],
  available_markets: [],
  disc_number: 0,
  duration_ms: 0,
  explicit: false,
  external_urls: { spotify: '' },
  href: '',
  id: '',
  is_playable: false,
  linked_from: {
    external_urls: { spotify: '' },
    href: '',
    id: '',
    type: '',
    uri: '',
  },
  name: '',
  preview_url: '',
  track_number: 0,
  type: '',
  uri: '',
  is_local: false,
};

// Filled Mock
export const filledTrack: Track = {
  artists: [filledArtist],
  available_markets: ['US', 'CA'],
  disc_number: 1,
  duration_ms: 200000,
  explicit: false,
  external_urls: { spotify: 'https://open.spotify.com/track/1234567890' },
  href: 'https://api.spotify.com/v1/tracks/1234567890',
  id: '1234567890',
  is_playable: true,
  linked_from: {
    external_urls: { spotify: 'https://open.spotify.com/track/0987654321' },
    href: 'https://api.spotify.com/v1/tracks/0987654321',
    id: '0987654321',
    type: 'track',
    uri: 'spotify:track:0987654321',
  },
  name: 'Test Track',
  preview_url: 'https://p.scdn.co/mp3-preview/testtrack',
  track_number: 1,
  type: 'track',
  uri: 'spotify:track:1234567890',
  is_local: false,
};
