import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  loading: boolean;
  artist: any = {};
  albumArtist: any = {};

  constructor(
    private route: ActivatedRoute,
    private spotify: SpotifyService,
    private router: Router
  ) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.getArtist(params['id']);
      this.getAlbumArtist(params['id']);
    });
  }

  getArtist(id: string) {
    this.spotify.getArtist(id).subscribe(artist => {
      this.artist = artist;
      this.loading = false;
    });
  }

  getAlbumArtist(id: string) {
    this.spotify.getAlbumArtist(id).subscribe(albumArtist => {
      this.albumArtist = albumArtist;
      this.loading = false;
    });
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
