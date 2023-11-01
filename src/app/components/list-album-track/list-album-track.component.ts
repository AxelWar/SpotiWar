import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { emptyTrack } from '../shared/mocks/track.mock';
import { Track } from '../shared/interfaces/track.interface';

@Component({
  selector: 'app-list-album-track',
  templateUrl: './list-album-track.component.html',
})
export class ListAlbumTrackComponent {
  @Input() items: Track[] = [emptyTrack];
  songId!: string;

  loading = false;

  constructor(
    private router: Router,
    private spotify: SpotifyService
  ) {}

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
}
