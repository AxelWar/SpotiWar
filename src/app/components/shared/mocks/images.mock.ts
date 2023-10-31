import { Images } from '../interfaces/images.interface';

// Empty Mock
export const emptyImage: Images = {
  height: 0,
  url: '',
  width: 0,
};

// Filled Mock
export const filledImage: Images = {
  height: 640,
  url: 'http://example.com/image.jpg',
  width: 640,
};
