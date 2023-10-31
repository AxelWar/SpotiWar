import {
  ExternalUrls,
  ExternalIds,
} from '../interfaces/external-data.interface';

// Empty Mocks
export const emptyExternalUrls: ExternalUrls = {
  spotify: '',
};

export const emptyExternalIds: ExternalIds = {
  isrc: '',
};

// Filled Mocks
export const filledExternalUrls: ExternalUrls = {
  spotify: 'https://open.spotify.com/track/1122334455',
};

export const filledExternalIds: ExternalIds = {
  isrc: 'US1234567890',
};
