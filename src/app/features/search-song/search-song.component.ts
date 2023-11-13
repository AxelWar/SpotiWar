import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'src/app/shared/interfaces/track.interface';
import { SpotifyService } from '../../shared/services/spotify.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search-song.component.html',
})
export class SearchSongComponent {
  private tracksSubject = new BehaviorSubject<Track[]>([]);
  tracks$: Observable<Track[]> = this.tracksSubject.asObservable();
  displayArtist: boolean = true;
  loading = false;

  constructor(
    private spotify: SpotifyService,
    public route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.search(params['searchTerm']);
      }
    });
  }

  search(searchTerm: string) {
    if (!searchTerm) {
      return;
    }
    this.loading = true;
    this.spotify.getSongs(searchTerm).subscribe((data: Track[]) => {
      this.tracksSubject.next(data);
      this.loading = false;
    });
  }
}
