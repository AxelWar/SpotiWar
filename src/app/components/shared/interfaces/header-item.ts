import { Images } from './images.interface';

export interface HeaderItem {
  name?: string;
  display_name?: string;
  images: Images[];
}
