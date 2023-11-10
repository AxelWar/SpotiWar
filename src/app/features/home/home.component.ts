import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  forkJoin,
  takeUntil,
} from 'rxjs';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Track } from 'src/app/shared/interfaces/track.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { emptyUser } from 'src/app/shared/mocks/user.mock';
import { FavoriteService } from 'src/app/shared/services/favorite.service';
import { SpotifyService } from '../../shared/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private tracksSubject = new BehaviorSubject<Track[]>([]);
  tracks$ = this.tracksSubject.asObservable();
  private unsubscribe$ = new Subject<void>();
  profile: User = emptyUser;
  tracks: Track[] = [];
  newReleases: Album[] = [];
  displayArtist: boolean = true;
  loading = true;
  error = false;
  errorMessage!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.tracks$ = this.favoriteService.getFavoriteTracks();
    this.fetchProfileData();
    this.fetchNewReleases();
    this.fetchFavoritesTracks();
  }

  fetchFavoritesTracks() {
    this.favoriteService
      .getFavoriteTracks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tracks: Track[]) => {
        this.tracks = tracks;
      }, this.handleError);
  }

  fetchProfileData() {
    this.spotifyService.getProfile().subscribe(data => {
      this.profile = data;
      this.loading = false;
    }, this.handleError);
  }

  fetchNewReleases() {
    this.spotifyService.getNewReleases().subscribe(data => {
      this.newReleases = data;
      this.loading = false;
    }, this.handleError);
  }

  handleError = (errorService: HttpErrorResponse) => {
    this.loading = false;
    this.error = true;
    this.errorMessage = errorService.error.error.message;
  };

  seeArtist(item: Album) {
    let artistId;
    if (item.type === 'artist') {
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }
    this.router.navigate(['/artist', artistId]);
  }
  /*   toggleFavorite(songId: string) {
    this.favoriteService
      .toggleFavorite(songId)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error, caught) => {
          // handle error
          return caught;
        })
      )
      .subscribe(() => {
        // Refresh the favorites after toggling
        this.favoriteService
          .getFavoriteTracks()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((tracks: Track[]) => {
            this.tracksSubject.next(tracks); // Refresh the BehaviorSubject with new data
          });
      });
  } */

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
