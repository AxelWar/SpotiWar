import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FavoriteTracksActions from '../store/actions/favorite-tracks.actions';
import { AppState } from '../store/app.state';
import { Observable, map } from 'rxjs';
import { selectFavoriteTracks } from '../store/selectors/favorite-tracks.selectors';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private store: Store<AppState>) {}

  // Method to dispatch the action to load favorites
  loadFavorites() {
    // You might need to add logic here to actually load the favorites, e.g., from an API or localStorage
    // For now, we're just going to dispatch the action
    this.store.dispatch(FavoriteTracksActions.loadFavorites());
  }

  // Method to dispatch the action to add a song to favorites
  addFavorite(songId: string) {
    this.store.dispatch(FavoriteTracksActions.addFavorite({ songId }));
  }

  // Method to dispatch the action to remove a song from favorites
  removeFavorite(songId: string) {
    this.store.dispatch(FavoriteTracksActions.removeFavorite({ songId }));
  }

  isFavorite(songId: string): Observable<boolean> {
    return this.store
      .select(selectFavoriteTracks)
      .pipe(map(favorites => favorites.includes(songId)));
  }

  toggleFavorite(songId: string) {
    // This method would dispatch the right action based on whether songId is already in favorites
    this.isFavorite(songId).subscribe(isFav => {
      if (isFav) {
        this.removeFavorite(songId);
      } else {
        this.addFavorite(songId);
      }
    });
  }

  // Additional methods related to favorites could be added here, like syncing with a backend, etc.
}
