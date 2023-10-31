import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Input() items: any[] = [];
  songId!: string;
  loading = false;

  constructor(
    private router: Router,
    private spotify: SpotifyService
  ) {}
  seeArtist(item: any) {
    let artistId;
    if (item.type === 'artist') {
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }
    this.router.navigate(['/artist', artistId]);
  }

  checkFav(songId: string) {
    return this.spotify.setFavorite(songId);
  }

  checkIfFavorite(songId: string) {
    if (this.spotify.setFavorite(songId) === true) {
      this.spotify.removeFavorite(songId);
    } else {
      this.spotify.setFavoriteSongs(songId);
    }
  }
  sort() {
    if (this.items[0].duration_ms > this.items[1].duration_ms) {
      this.items.sort((a, b) => a.duration_ms - b.duration_ms);
    } else {
      this.items.sort((a, b) => b.duration_ms - a.duration_ms);
    }
  }
  sortn() {
    if (this.items[0].track_number > this.items[1].track_number) {
      this.items.sort((a, b) => a.track_number - b.track_number);
    } else {
      this.items.sort((a, b) => b.track_number - a.track_number);
    }
  }
}
