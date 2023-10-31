import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Albums } from '../shared/interfaces/albums.interface';
import { Artist } from '../shared/interfaces/artist.interface';
import { EMPTY_ALBUMS } from '../shared/mocks/albums.mock';
import { EMPTY_ARTIST } from '../shared/mocks/artist.mock';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  loading = false;
  artist: Artist = EMPTY_ARTIST;
  albumArtist: Albums = EMPTY_ALBUMS;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.getArtist(params['id']);
      this.getAlbumArtist(params['id']);
    });
  }

  getArtist(id: string) {
    this.loading = true;
    this.spotify.getArtist(id).subscribe(artist => {
      this.artist = artist;
      this.loading = false;
    });
  }

  getAlbumArtist(id: string) {
    this.loading = true;
    this.spotify.getAlbumArtist(id).subscribe(albumArtist => {
      this.albumArtist = albumArtist;
      this.loading = false;
    });
  }

  seeSongsAlbum(album: any) {
    this.loading = true;
    let albumId;

    if (album.type === 'album') {
      albumId = album.id;
    } else {
      albumId = album.album[0].id;
    }

    this.router.navigate(['/track', albumId]);
  }
}
