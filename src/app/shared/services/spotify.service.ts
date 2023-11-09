import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { Album } from 'src/app/shared/interfaces/album.interface';
import {
  Albums,
  AlbumsResponse,
} from 'src/app/shared/interfaces/albums.interface';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { Track } from 'src/app/shared/interfaces/track.interface';
import { TracksResponse } from 'src/app/shared/interfaces/tracks.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { AuthModalService } from './auth-modal.service';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
const SCOPES = encodeURIComponent('user-read-private user-read-email');

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private readonly localStorageKey = 'favs';
  constructor(
    private http: HttpClient,
    private authModalService: AuthModalService
  ) {}

  private getToken(): string | null {
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
  }

  // Extract the token and expiration from the URL and save it
  extractTokenFromUrl(): void {
    const currentUrl = window.location.href;
    const token = currentUrl.includes('access_token=')
      ? currentUrl.split('access_token=')[1].split('&')[0]
      : '';
    this.saveToken(token, 3600);
  }

  // Save token with expiration time
  saveToken(token: string, expiresIn: number): void {
    const expirationTime = new Date().getTime() + expiresIn * 1000; // expiresIn is in seconds
    localStorage.setItem('auth', token);
    localStorage.setItem('auth_expiration', expirationTime.toString());
  }

  // Check if the token is expired
  isTokenExpired(): boolean {
    const expirationTime = localStorage.getItem('auth_expiration');
    return (
      !expirationTime || new Date().getTime() > parseInt(expirationTime, 10)
    );
  }

  private getUrl<T>(query: string): Observable<T> {
    const token = this.getToken();
    if (!token || this.isTokenExpired()) {
      this.authModalService.showAuthModal(); // Replace with your modal service
      return EMPTY; // Prevent further processing
    }
    const url = `${SPOTIFY_API_BASE_URL}/${query}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<T>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('An error occurred; please try again later.')
    );
  }

  getNewReleases(): Observable<Album[]> {
    return this.getUrl<AlbumsResponse>('browse/new-releases').pipe(
      map((data: AlbumsResponse) => data.albums.items)
    );
  }

  getArtist(id: string): Observable<Artist> {
    return this.getUrl<Artist>(`artists/${id}`).pipe(
      map((data: Artist) => data)
    );
  }

  getArtistsAlbums(id: string): Observable<Albums> {
    return this.getUrl<Albums>(`artists/${id}/albums`).pipe(
      map((data: Albums) => data)
    );
  }

  getAlbum(id: string): Observable<Album> {
    return this.getUrl<Album>(`albums/${id}`).pipe(map((data: Album) => data));
  }

  getSongs(searchTerm: string): Observable<Track[]> {
    return this.getUrl<TracksResponse>(
      `search?q=${searchTerm}&type=track&market=US`
    ).pipe(map((data: TracksResponse) => data.tracks.items));
  }

  getSong(id: string): Observable<Track> {
    return this.getUrl<Track>(`tracks/${id}`).pipe(map((data: Track) => data));
  }

  getProfile(): Observable<User> {
    return this.getUrl<User>('me').pipe(map((data: User) => data));
  }

  private getFavoriteSongs(): string[] {
    try {
      const favs = localStorage.getItem(this.localStorageKey);
      if (favs) {
        return JSON.parse(favs);
      }
    } catch (error) {
      console.error('Failed to parse favorite songs from localStorage', error);
    }
    return [];
  }

  private saveFavoriteSongs(favoriteSongs: string[]): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(favoriteSongs));
    } catch (error) {
      console.error('Failed to save favorite songs to localStorage', error);
    }
  }

  isFavorite(songId: string): boolean {
    const favoriteSongs = this.getFavoriteSongs();
    return favoriteSongs.includes(songId);
  }

  addFavorite(songId: string): void {
    const favoriteSongs = this.getFavoriteSongs();
    if (!favoriteSongs.includes(songId)) {
      favoriteSongs.push(songId);
      this.saveFavoriteSongs(favoriteSongs);
    }
  }

  removeFavorite(songId: string): void {
    const favoriteSongs = this.getFavoriteSongs();
    const updatedFavorites = favoriteSongs.filter(
      favSongId => favSongId !== songId
    );
    this.saveFavoriteSongs(updatedFavorites);
  }
}
