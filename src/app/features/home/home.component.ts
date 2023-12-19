import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
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
      });
  }

  fetchProfileData() {
    this.spotifyService
      .getProfile()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: User) => {
        this.profile = data;
        this.loading = false;
      });
  }

  fetchNewReleases() {
    this.spotifyService
      .getNewReleases()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Album[]) => {
        this.newReleases = data;
        this.loading = false;
      });
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
