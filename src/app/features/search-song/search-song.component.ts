import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'src/app/shared/interfaces/track.interface';
import { SpotifyService } from '../../shared/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search-song.component.html',
})
export class SearchSongComponent {
  tracks: Track[] = [];
  displayArtist: boolean = true;
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
    this.spotify.getSongs(searchTerm).subscribe((data: Track[]) => {
      this.tracks = data;
      this.loading = false;
    });
  }
}
