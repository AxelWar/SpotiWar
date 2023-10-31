import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent {
  loading = true;
  album: any = {};

  constructor(
    private router: ActivatedRoute,
    private spotify: SpotifyService
  ) {
    this.loading = true;
    this.router.params.subscribe(params => {
      this.getAlbum(params['id']);
    });
  }

  getAlbum(id: string) {
    this.loading = true;
    this.spotify.getAlbum(id).subscribe(album => {
      this.album = album;
      this.loading = false;
    });
  }
}
