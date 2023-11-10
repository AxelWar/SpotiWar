import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin } from 'rxjs';
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
  private unsubscribe$ = new Subject<void>();
  profile: User = emptyUser;
  listFavorites: string[] = [];
  favoriteSongs: string[] = [];
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
    this.initializeFavorites();
    this.fetchProfileData();
    this.fetchNewReleases();
  }

  initializeFavorites() {
    if (!localStorage.getItem('favs')) {
      this.favoriteSongs.push('6rVNnvyNeibts1uOqdSNIw');
      localStorage.setItem('favs', JSON.stringify(this.favoriteSongs));
    }
    this.getFavorites();
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

  getFavorites() {
    this.listFavorites = JSON.parse(localStorage.getItem('favs') as string);
    const requests = this.listFavorites.map(fav =>
      this.spotifyService.getSong(fav)
    );
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
    return this.favoriteService.isFavorite(songId);
  }

  setFavorites(songId: string) {
    if (this.checkIfFavorite(songId)) {
      this.favoriteService.removeFavorite(songId);
    } else {
      this.favoriteService.addFavorite(songId);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
