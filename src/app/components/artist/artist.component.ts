import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Albums } from '../shared/interfaces/albums.interface';
import { Artist } from '../shared/interfaces/artist.interface';
import { Album } from '../shared/interfaces/album.interface';
import { emptyArtist } from '../shared/mocks/artist.interface';
import { emptyAlbums } from '../shared/mocks/albums.mock';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  loading = false;
  artist: Artist = emptyArtist;
  albumArtist: Albums = emptyAlbums;

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.getArtist(params['id']);
      this.getArtistsAlbums(params['id']);
    });
  }

  getArtist(id: string) {
    this.loading = true;
    this.spotify.getArtist(id).subscribe(artist => {
      this.artist = artist;
      this.loading = false;
    });
  }

  getArtistsAlbums(id: string) {
    this.loading = true;
    this.spotify.getArtistsAlbums(id).subscribe(albumArtist => {
      this.albumArtist = albumArtist;
      this.loading = false;
    });
  }

  seeSongsAlbum(album: Album) {
    this.loading = true;
    let albumId;
    if (album.type === 'album') {
      albumId = album.id;
    }
    this.router.navigate(['/track', albumId]);
  }
}
