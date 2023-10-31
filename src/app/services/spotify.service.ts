import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Album } from '../components/shared/interfaces/album.interface';
import {
  Albums,
  AlbumsResponse,
} from '../components/shared/interfaces/albums.interface';
import { Artist } from '../components/shared/interfaces/artist.interface';
import { Track } from '../components/shared/interfaces/track.interface';
import { TracksResponse } from '../components/shared/interfaces/tracks.interface';
import { User } from '../components/shared/interfaces/user.interface';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
const SCOPES = encodeURIComponent('user-read-private user-read-email');

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('auth');
  }

  auth() {
    const token = this.getToken();
    if (!token) {
      const url = this.constructAuthUrl();
      window.location.href = url;
    }
  }

  private constructAuthUrl(): string {
    return `${SPOTIFY_AUTH_BASE_URL}?client_id=${environment.spotifyClientId}&response_type=token&redirect_uri=${environment.redirectUri}&scope=${SCOPES}&show_dialog=true`;
  }

  private getUrl(query: string): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('Spotify token is not set'));
    }
    const url = `${SPOTIFY_API_BASE_URL}/${query}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('An error occurred; please try again later.')
    );
  }

  getNewReleases(): Observable<Album[]> {
    return this.getUrl('browse/new-releases').pipe(
      map((data: AlbumsResponse) => data.albums.items)
    );
  }

  getArtist(id: string): Observable<Artist> {
    return this.getUrl(`artists/${id}`).pipe(map((data: Artist) => data));
  }

  getArtistsAlbums(id: string): Observable<Albums> {
    return this.getUrl(`artists/${id}/albums`).pipe(
      map((data: Albums) => data)
    );
  }

  getAlbums(searchTerm: string): Observable<any> {
    return this.getUrl(`search?q=${searchTerm}&type=album&market=US`).pipe(
      map((data: any) => data.albums.items)
    );
  }

  getAlbum(id: string): Observable<any> {
    return this.getUrl(`albums/${id}`).pipe(map((data: any) => data));
  }

  getSongs(searchTerm: string): Observable<Track[]> {
    return this.getUrl(`search?q=${searchTerm}&type=track&market=US`).pipe(
      map((data: TracksResponse) => data.tracks.items)
    );
  }

  getSong(id: string): Observable<Track> {
    return this.getUrl(`tracks/${id}`).pipe(map((data: Track) => data));
  }

  getProfile(): Observable<User> {
    return this.getUrl('me').pipe(map((data: User) => data));
  }

  setFavorite(songId: string): boolean {
    const favoriteSongs =
      JSON.parse(localStorage.getItem('favs') as string) || [];
    return favoriteSongs.includes(songId);
  }

  setFavoriteSongs(songId: string): void {
    const favoriteSongs =
      JSON.parse(localStorage.getItem('favs') as string) || [];
    if (!favoriteSongs.includes(songId)) {
      favoriteSongs.push(songId);
      localStorage.setItem('favs', JSON.stringify(favoriteSongs));
    }
  }

  removeFavorite(songId: string): void {
    let favoriteSongs =
      JSON.parse(localStorage.getItem('favs') as string) || [];
    favoriteSongs = favoriteSongs.filter(
      (favSongId: string) => favSongId !== songId
    );
    localStorage.setItem('favs', JSON.stringify(favoriteSongs));
  }
}
