// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  constructAuthUrl(): string {
    const { spotifyClientId, redirectUri } = environment;
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const SPOTIFY_AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
    return `${SPOTIFY_AUTH_BASE_URL}?client_id=${spotifyClientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=true`;
  }

  redirectToSpotifyAuth() {
    window.location.href = this.constructAuthUrl();
  }

  getTokenFromUrl(): Observable<string> {
    try {
      const currentUrl = window.location.href; // Using `href` instead of `router.url` because this might be called before Angular's router is fully initialized
      const token = currentUrl.includes('access_token=')
        ? currentUrl.split('access_token=')[1].split('&')[0]
        : '';
      return of(token);
    } catch (e) {
      console.log('unable to save token' + e);
      return of(''); // Return an empty string or handle the error as needed
    }
  }
}
