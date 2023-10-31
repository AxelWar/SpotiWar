import { ExternalUrls } from './external-data.interface';
import { Images } from './images.interface';

export interface User {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  type: string;
  uri: string;
  country: string;
  product: string;
  email: string;
}
