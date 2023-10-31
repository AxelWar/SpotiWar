import { ExternalUrls } from './external-data.interface';
import { Images } from './images.interface';

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Images[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface Followers {
  href: string;
  total: number;
}
