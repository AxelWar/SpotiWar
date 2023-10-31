import { Album } from './album.interface';
import { Artist } from './artist.interface';
import { ExternalIds } from './external-ids.interface';
import { ExternalUrls } from './external-urls.interface';

export interface Track {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url?: string;
  track_number: number;
  type: string;
  uri: string;
}
