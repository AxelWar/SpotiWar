import { User } from '../interfaces/user.interface';

// Empty Mock
export const emptyUser: User = {
  display_name: '',
  external_urls: { spotify: '' },
  href: '',
  id: '',
  images: [],
  type: '',
  uri: '',
  country: '',
  product: '',
  email: '',
};

// Filled Mock
export const filledUser: User = {
  display_name: 'Test User',
  external_urls: { spotify: 'https://open.spotify.com/user/1234567890' },
  href: 'https://api.spotify.com/v1/users/1234567890',
  id: '1234567890',
  images: [{ height: 640, url: 'http://example.com/user.jpg', width: 640 }],
  type: 'user',
  uri: 'spotify:user:1234567890',
  country: 'US',
  product: 'premium',
  email: 'test.user@example.com',
};
