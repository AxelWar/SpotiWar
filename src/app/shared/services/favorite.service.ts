// favorite.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Track } from '../interfaces/track.interface';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly localStorageKey = 'favs';

  constructor(private spotifyService: SpotifyService) {}
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

  getFavoriteTracks(): Observable<Track[]> {
    const favoriteIds = this.getFavoriteSongs();
    if (favoriteIds.length === 0) return of([]);
    const requests = favoriteIds.map(id => this.spotifyService.getSong(id));
    return forkJoin(requests);
  }

  toggleFavorite(songId: string): void {
    if (this.isFavorite(songId)) {
      this.removeFavorite(songId);
    } else {
      this.addFavorite(songId);
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
