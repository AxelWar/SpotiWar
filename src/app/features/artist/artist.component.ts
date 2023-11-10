import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Albums } from 'src/app/shared/interfaces/albums.interface';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { emptyAlbums } from 'src/app/shared/mocks/albums.mock';
import { emptyArtist } from 'src/app/shared/mocks/artist.interface';
import { SpotifyService } from '../../shared/services/spotify.service';

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
