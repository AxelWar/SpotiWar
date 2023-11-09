// favorite.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import * as FavoriteActions from '../store/actions/favorite-tracks.actions';
import { selectFavorites } from '../store/selectors/favorite-tracks.selectors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private localStorageKey = 'favs';
  constructor(private store: Store<AppState>) {}

  loadFavoritesFromLocalStorage() {
    const favorites = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]'
    );
    this.store.dispatch(FavoriteActions.loadFavoritesSuccess({ favorites }));
  }

  // Dispatch action to add a favorite track
  addFavorite(trackId: string) {
    // Correct parameter name used here
    this.store.dispatch(FavoriteActions.addFavorite({ trackId }));
  }

  // Dispatch action to remove a favorite track
  removeFavorite(trackId: string) {
    // Correct parameter name used here
    this.store.dispatch(FavoriteActions.removeFavorite({ trackId }));
  }

  // Get an observable of the favorite tracks' IDs
  getFavoriteTrackIds(): Observable<string[]> {
    return this.store.select(selectFavorites);
  }

  // Check if a track is favorite by its ID
  isTrackFavorite(trackId: string): Observable<boolean> {
    // Select from store and map to a boolean indicating the presence of trackId in favorites
    return this.store
      .select(selectFavorites)
      .pipe(map(favorites => favorites.includes(trackId)));
  }
}
