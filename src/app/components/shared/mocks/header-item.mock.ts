import { HeaderItem } from '../interfaces/header-item.interface';

// Empty Mock
export const emptyHeaderItem: HeaderItem = {
  name: '',
  display_name: '',
  images: [{ height: 0, url: '', width: 0 }],
};

// Filled Mock
export const filledHeaderItem: HeaderItem = {
  name: 'Test Name',
  display_name: 'Test Display Name',
  images: [{ height: 640, url: 'http://example.com/header.jpg', width: 640 }],
};
