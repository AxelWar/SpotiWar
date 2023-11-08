import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { Album } from '../shared/interfaces/album.interface';
import { Track } from '../shared/interfaces/track.interface';
import { User } from '../shared/interfaces/user.interface';
import { emptyUser } from '../shared/mocks/user.mock';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  profile: User = emptyUser;
  listFavorites: string[] = [];
  favoriteSongs: string[] = [];
  tracks: Track[] = [];
  newReleases: Album[] = [];
  displayArtist: boolean = true;
  loading = false;
  error = false;
  errorMessage!: string;
  constructor(
    private router: Router,
    private spotify: SpotifyService,
    private store: Store
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
    if (!localStorage.getItem('favs')) {
      this.favoriteSongs.push('6rVNnvyNeibts1uOqdSNIw');
      localStorage.setItem('favs', JSON.stringify(this.favoriteSongs));
    }
    this.getFavorites();
  }

  fetchProfileData() {
    this.spotify.getProfile().subscribe(data => {
      this.profile = data;
      this.loading = false;
    }, this.handleError);
  }

  fetchNewReleases() {
    this.spotify.getNewReleases().subscribe(data => {
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
    this.spotify.getNewReleases().subscribe(
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

  getFavorites() {
    this.listFavorites = JSON.parse(localStorage.getItem('favs') as string);
    const requests = this.listFavorites.map(fav => this.spotify.getSong(fav));
    forkJoin(requests).subscribe(
      (data: Track[]) => {
        this.tracks = [...this.tracks, ...data];
      },
      error => {
        console.error('Error fetching tracks:', error);
      }
    );
  }

  checkIfFavorite(songId: string): boolean {
    return this.spotify.isFavorite(songId);
  }

  setFavorites(songId: string) {
    if (this.checkIfFavorite(songId)) {
      this.spotify.removeFavorite(songId);
    } else {
      this.spotify.addFavorite(songId);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
