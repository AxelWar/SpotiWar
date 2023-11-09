import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { SpotifyService } from '../../services/spotify.service';
import * as AuthActions from '../../store/actions/auth.actions';
import { Album } from '../shared/interfaces/album.interface';
import { Track } from '../shared/interfaces/track.interface';
import { User } from '../shared/interfaces/user.interface';
import { emptyUser } from '../shared/mocks/user.mock';
import { loadFavorites } from 'src/app/store/actions/favorite-tracks.actions';
import { FavoriteService } from 'src/app/services/favorite.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  profile: User = emptyUser;
  tracks: Track[] = [];
  newReleases: Album[] = [];
  displayArtist: boolean = true;
  loading = false;
  error = false;
  errorMessage!: string;
  constructor(
    private router: Router,
    private spotifyService: SpotifyService,
    private favoriteService: FavoriteService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.initializeFavorites();
    this.fetchProfileData();
    this.fetchNewReleases();
  }
  loginRefresh() {
    //move this logic to ngrx and a guard with a modal
    //message with the warning and click button to
    //redirect to spotify login page.
    this.store.dispatch(AuthActions.logout());
  }

  initializeFavorites() {
    // Use the service to load initial favorites
    this.favoriteService.loadFavoritesFromLocalStorage();
  }

  // Call this method when you need to check if a song is a favorite
  isTrackFavorite(trackId: string): Observable<boolean> {
    return this.favoriteService.isTrackFavorite(trackId); // This returns an Observable<boolean>
  }

  setFavorites(trackId: string): void {
    // Since isTrackFavorite returns an Observable, you need to subscribe to it
    // to get the value inside an imperative method like setFavorites
    this.isTrackFavorite(trackId).subscribe(isFavorite => {
      if (isFavorite) {
        this.favoriteService.removeFavorite(trackId);
      } else {
        this.favoriteService.addFavorite(trackId);
      }
    });
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

  getReleases() {
    this.loading = true;
    this.spotifyService.getNewReleases().subscribe(
      (data: Album[]) => {
        this.loading = false;
        this.newReleases = data;
      },
      errorService => {
        this.loading = false;
        this.error = true;
        this.errorMessage = errorService.error.error.message;
      }
    );
  }

  seeArtist(item: Album) {
    let artistId;
    if (item.type === 'artist') {
      artistId = item.id;
    } else {
      artistId = item.artists[0].id;
    }
    this.router.navigate(['/artist', artistId]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
