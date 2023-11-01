import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Track } from '../../interfaces/track.interface';

@Component({
  selector: 'app-list-track',
  templateUrl: './list-track.component.html',
  styleUrls: ['./list-track.component.scss'],
})
export class ListTrackComponent {
  @Input() tracks: Track[] = [];
  @Input() displayArtist: boolean = false;
  durationSortOrder: 'asc' | 'desc' = 'asc';
  trackNumberSortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private router: Router,
    private spotify: SpotifyService
  ) {}

  seeArtist(item: any) {
    let artistId = item.type === 'artist' ? item.id : item.artists[0].id;
    this.router.navigate(['/artist', artistId]);
  }

  checkFav(songId: string) {
    return this.spotify.isFavorite(songId);
  }

  checkIfFavorite(songId: string) {
    if (this.spotify.isFavorite(songId)) {
      this.spotify.removeFavorite(songId);
    } else {
      this.spotify.addFavorite(songId);
    }
  }

  sortDuration() {
    this.tracks.sort((a, b) =>
      this.durationSortOrder === 'asc'
        ? a.duration_ms - b.duration_ms
        : b.duration_ms - a.duration_ms
    );
    this.durationSortOrder = this.durationSortOrder === 'asc' ? 'desc' : 'asc';
  }

  sortTrackNumber() {
    this.tracks.sort((a, b) =>
      this.trackNumberSortOrder === 'asc'
        ? a.track_number - b.track_number
        : b.track_number - a.track_number
    );
    this.trackNumberSortOrder =
      this.trackNumberSortOrder === 'asc' ? 'desc' : 'asc';
  }
}
