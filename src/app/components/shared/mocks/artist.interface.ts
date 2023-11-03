import { Artist } from '../interfaces/artist.interface';

// Empty Mock
export const emptyArtist: Artist = {
  external_urls: { spotify: '' },
  followers: { href: '', total: 0 },
  genres: [],
  href: '',
  id: '',
  images: [
    {
      height: 0,
      url: '',
      width: 0,
    },
  ],
  name: '',
  popularity: 0,
  type: '',
  uri: '',
};

// Filled Mock
export const filledArtist: Artist = {
  external_urls: { spotify: 'https://open.spotify.com/artist/0987654321' },
  followers: { href: '', total: 1000 },
  genres: ['pop'],
  href: 'https://api.spotify.com/v1/artists/0987654321',
  id: '0987654321',
  images: [{ height: 640, url: 'http://example.com/artist.jpg', width: 640 }],
  name: 'Test Artist',
  popularity: 50,
  type: 'artist',
  uri: 'spotify:artist:0987654321',
};
