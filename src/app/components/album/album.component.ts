import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../shared/interfaces/album.interface';
import { Albums } from '../shared/interfaces/albums.interface';
import { EMPTY_ALBUMS } from '../shared/mocks/albums.mock';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent {
  loading = true;
  album: Albums = EMPTY_ALBUMS;

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
