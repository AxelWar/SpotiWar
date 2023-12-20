import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'src/app/shared/interfaces/track.interface';
import { SpotifyService } from '../../shared/services/spotify.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search-song.component.html',
})
export class SearchSongComponent implements OnInit, OnDestroy {
  tracksSubject$ = new BehaviorSubject<Track[]>([]);
  tracks$: Observable<Track[]> = this.tracksSubject$.asObservable();
  private unsubscribe$ = new Subject<void>();
  displayArtist: boolean = true;
  loading = false;

  constructor(
    private spotify: SpotifyService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initParams();
  }

  initParams() {
    this.activatedRoute.params.subscribe(params => {
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
    this.spotify
      .getSongs(searchTerm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Track[]) => {
        this.tracksSubject$.next(data);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.tracksSubject$.complete();
  }
}
