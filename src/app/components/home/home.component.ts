import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Track } from '../shared/interfaces/track.interface';
import { User } from '../shared/interfaces/user.interface';
import { emptyTrack } from '../shared/mocks/track.mock';
import { emptyUser } from '../shared/mocks/user.mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  profile: User = emptyUser;
  listFavorites!: string;
  favoriteSongs: string[] = [];
  tracks: Track[] = [];
  newSongs: Track[] = [];
  displayArtist: boolean = true;
  loading = false;
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
      (data: User) => {
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

  getReleases() {
    this.loading = true;
    this.spotify.getNewReleases().subscribe(
      (data: any) => {
        this.loading = false;
        this.newSongs = data;
      },
      errorService => {
        this.loading = false;
        this.error = true;
        this.errorMessage = errorService.error.error.message;
      }
    );
  }

  seeArtist(item: Track) {
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
    for (let i = 0; i < this.listFavorites.length; i++) {
      this.spotify.getSong(this.listFavorites[i]).subscribe((data: Track) => {
        this.tracks.push(data);
      });
    }
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

  sort() {
    if (this.tracks[0].duration_ms > this.tracks[1].duration_ms) {
      this.tracks.sort((a, b) => a.duration_ms - b.duration_ms);
    } else {
      this.tracks.sort((a, b) => b.duration_ms - a.duration_ms);
    }
  }
  sortn() {
    if (this.tracks[0].track_number > this.tracks[1].track_number) {
      this.tracks.sort((a, b) => a.track_number - b.track_number);
    } else {
      this.tracks.sort((a, b) => b.track_number - a.track_number);
    }
  }
}
