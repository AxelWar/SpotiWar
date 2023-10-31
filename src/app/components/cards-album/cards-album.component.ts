import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../shared/interfaces/album.interface';
import { Albums } from '../shared/interfaces/albums.interface';
@Component({
  selector: 'app-cards-album',
  templateUrl: './cards-album.component.html',
})
export class CardsAlbumComponent {
  @Input() items: any[] = [];
  loading: boolean;
  artist: any = {};
  albumArtist: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loading = true;
    this.route.params.subscribe(params => {});
  }

  seeAlbum(item: Album) {
    let albumId;
    if (item.type === 'album') {
      albumId = item.id;
    }
    this.router.navigate(['/album', albumId]);
  }

  seeSongsAlbum(album: Album) {
    let albumId;
    if (album.type === 'album') {
      albumId = album.id;
    }
    this.router.navigate(['/track', albumId]);
  }
}
