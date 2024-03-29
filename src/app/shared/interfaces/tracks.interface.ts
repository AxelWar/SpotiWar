import { Track } from './track.interface';

export interface Tracks {
  href: string;
  items: Track[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface TracksResponse {
  tracks: Tracks;
}
