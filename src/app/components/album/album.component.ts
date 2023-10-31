import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../shared/interfaces/album.interface';
import { emptyAlbum } from '../shared/mocks/album.mock';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent {
  album: Album = emptyAlbum;
  loading = false;

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
    this.spotify.getAlbum(id).subscribe(albums => {
      this.album = albums;
      this.loading = false;
    });
  }
}
