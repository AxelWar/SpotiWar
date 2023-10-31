import { Album } from './album.interface';

export interface Albums {
  href: string;
  items: Album[];
  limit: number;
  next: string;
  offset: number;
  previous?: any;
  total: number;
}

export interface AlbumsResponse {
  albums: Albums;
}
