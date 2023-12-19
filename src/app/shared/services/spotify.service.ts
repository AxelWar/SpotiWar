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
import { AuthService } from './auth.service';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getUrl<T>(query: string): Observable<T> {
    const token = this.authService.getToken();
    if (!token || this.authService.isTokenExpired()) {
      this.authService.showAuthModal();
      return EMPTY;
    }
    const url = `${SPOTIFY_API_BASE_URL}/${query}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<T>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
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
}
