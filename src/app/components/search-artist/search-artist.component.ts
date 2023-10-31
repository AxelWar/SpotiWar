import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
})
export class SearchArtistComponent {
  artists: any[] = [];
  loading = false;

  constructor(private spotify: SpotifyService) {}

  search(searchTerm: string) {
    this.loading = true;
    this.spotify.getArtists(searchTerm).subscribe((data: any) => {
      this.artists = data;
      this.loading = false;
    });
  }
}
