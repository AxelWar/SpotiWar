import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search-song.component.html',
})
export class SearchSongComponent {
  tracks: any[] = [];
  loading = false;
  searchTerm!: string;

  constructor(
    private spotify: SpotifyService,
    public route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
        this.search(this.searchTerm);
      }
    });
  }

  search(searchTerm: string) {
    if (searchTerm.length == 0) {
      return;
    }
    this.loading = true;
    this.spotify.getSongs(searchTerm).subscribe((data: any) => {
      this.tracks = data;
      this.loading = false;
    });
  }
}
