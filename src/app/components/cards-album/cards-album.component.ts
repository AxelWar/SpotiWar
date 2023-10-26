import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  seeAlbum(item: any) {
    let albumId;

    if (item.type === 'album') {
      albumId = item.id;
    } else {
      albumId = item.albums[0].id;
    }

    this.router.navigate(['/album', albumId]);
  }

  seeSongsAlbum(album: any) {
    let albumId;

    if (album.type === 'album') {
      albumId = album.id;
    } else {
      albumId = album.album[0].id;
    }

    this.router.navigate(['/track', albumId]);
  }
}
