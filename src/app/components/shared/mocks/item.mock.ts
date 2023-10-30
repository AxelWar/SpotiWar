import { Item } from '../interfaces/item.interface';

export const MOCK_ITEM: Item = {
  album_type: 'album',
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/22bE4uQ6baNwSHPVcDxLCe',
      },
      href: 'https://api.spotify.com/v1/artists/22bE4uQ6baNwSHPVcDxLCe',
      id: '22bE4uQ6baNwSHPVcDxLCe',
      name: 'The Rolling Stones',
      type: 'artist',
      uri: 'spotify:artist:22bE4uQ6baNwSHPVcDxLCe',
    },
  ],
  available_markets: ['US', 'CA'],
  external_urls: {
    spotify: 'https://open.spotify.com/album/123',
  },
  href: 'https://api.spotify.com/v1/albums/123',
  id: '123',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/abc123',
      width: 640,
    },
  ],
  name: 'Album Name',
  release_date: '2023-01-01',
  release_date_precision: 'day',
  total_tracks: 10,
  type: 'album',
  uri: 'spotify:album:123',
};

export const EMPTY_ITEM: Item = {
  album_type: '',
  artists: [],
  available_markets: [],
  external_urls: {
    spotify: '',
  },
  href: '',
  id: '',
  images: [],
  name: '',
  release_date: '',
  release_date_precision: '',
  total_tracks: 0,
  type: '',
  uri: '',
};
