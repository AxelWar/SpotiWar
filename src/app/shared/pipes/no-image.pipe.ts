import { Pipe, PipeTransform } from '@angular/core';
import { Images } from '../interfaces/images.interface';

@Pipe({
  name: 'noImage',
})
export class NoImagePipe implements PipeTransform {
  transform(images: Images[]): string {
    if (!images || images.length === 0) {
      return 'assets/img/noImage.png';
    }
    return images[0].url;
  }
}
