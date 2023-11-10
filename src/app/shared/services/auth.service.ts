// auth-modal.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthModalComponent } from 'src/app/shared/components/auth-modal/auth-modal.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private dialog: MatDialog,
    private routes: Router
  ) {}

  public showAuthModal(): void {
    this.dialog.open(AuthModalComponent, {
      width: '650px',
    });
  }

  getToken(): string | null {
    return localStorage.getItem('auth');
  }

  constructAuthUrl(): string {
    const { spotifyClientId, redirectUri } = environment;
    const scopes = encodeURIComponent('user-read-private user-read-email');
    const SPOTIFY_AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
    return `${SPOTIFY_AUTH_BASE_URL}?client_id=${spotifyClientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=true`;
  }

  redirectToSpotifyAuth() {
    window.location.href = this.constructAuthUrl();
    this.dialog.closeAll();
  }

  extractTokenFromUrl(): void {
    const currentUrl = window.location.href;
    const token = currentUrl.includes('access_token=')
      ? currentUrl.split('access_token=')[1].split('&')[0]
      : '';
    this.saveToken(token, 3600);
  }

  saveToken(token: string, expiresIn: number): void {
    const expirationTime = new Date().getTime() + expiresIn * 1000; // expiresIn is in seconds
    localStorage.setItem('auth', token);
    localStorage.setItem('auth_expiration', expirationTime.toString());
  }

  isTokenExpired(): boolean {
    const expirationTime = localStorage.getItem('auth_expiration');
    return (
      !expirationTime || new Date().getTime() > parseInt(expirationTime, 10)
    );
  }

  initLogin() {
    this.extractTokenFromUrl();
    if (!this.validateToken()) {
      this.redirectToSpotifyAuth();
    }
  }

  validateToken(): boolean {
    const token = this.getToken();
    if (!token || this.isTokenExpired()) {
      return false;
    } else {
      return true;
    }
  }
}
