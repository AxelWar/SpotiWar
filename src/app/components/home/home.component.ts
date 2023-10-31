import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { Track } from '../shared/interfaces/track.interface';
import { Profile } from '../shared/interfaces/profile.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  profile: Profile[] = [];
  listFavorites!: string;
  favoriteSongs: string[] = [];
  tracks: Track[] = [];
  newSongs: any[] = [];
  loading = true;
  error = false;
  errorMessage!: string;
  constructor(
    private router: Router,
    private spotify: SpotifyService
  ) {}

  ngOnInit() {
    this.login();
    if (localStorage.getItem('favs') == null) {
      this.favoriteSongs.push('6rVNnvyNeibts1uOqdSNIw');
      localStorage.setItem('favs', JSON.stringify(this.favoriteSongs));
    }
    this.getFavorites();

    this.spotify.getProfile().subscribe(
      (data: any) => {
        this.profile = data;
        this.loading = false;
      },
      errorService => {
        this.loading = false;
        this.error = true;
        this.errorMessage = errorService.error.error.message;
      }
    );

    this.spotify.getNewReleases().subscribe(
      (data: any) => {
        this.newSongs = data;
        this.loading = false;
      },
      errorService => {
        this.loading = false;
        this.error = true;
        this.errorMessage = errorService.error.error.message;
      }
    );
  }

  login() {
    const currentUrl = this.router.url.split('access_token=')[1];
    const token: string = currentUrl ? currentUrl.split('&')[0] : '';
    if (token) {
      localStorage.setItem('auth', token);
      setInterval(() => {
        localStorage.removeItem('auth');
        window.location.reload();
        this.spotify.auth();
      }, 3000000);
    } else {
      this.spotify.auth();
    }
  }
  loginRefresh() {
    localStorage.removeItem('auth');
    this.login();
  }

  getFavorites() {
    this.listFavorites = JSON.parse(localStorage.getItem('favs') as string);
    for (let i = 0; i < this.listFavorites.length; i++) {
      this.spotify.getSong(this.listFavorites[i]).subscribe((data: Track) => {
        this.tracks.push(data);
      });
    }
  }
}
