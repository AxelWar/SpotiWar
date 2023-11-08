// auth.service.ts
import { Injectable } from '@angular/core';
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

  // Add other Spotify-related auth methods here if needed
}
