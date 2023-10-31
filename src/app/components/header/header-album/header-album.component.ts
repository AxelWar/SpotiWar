import { Component, Input } from '@angular/core';
import { Album } from '../../shared/interfaces/album.interface';
import { EMPTY_ALBUM } from '../../shared/mocks/album.mock';

@Component({
  selector: 'app-header-album',
  templateUrl: './header-album.component.html',
})
export class HeaderAlbumComponent {
  @Input() items: Album = EMPTY_ALBUM;
  loading = false;

  constructor() {}
}
