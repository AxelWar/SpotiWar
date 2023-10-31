import { Artist } from './artist.interface';
import { ExternalIds, ExternalUrls } from './external-data.interface';
import { Images } from './images.interface';
import { Tracks } from './tracks.interface';

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: Tracks;
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
}

export interface AlbumResponse {
  album: Album;
}

interface Restrictions {
  reason: string;
}

interface Copyright {
  text: string;
  type: string;
}
