// favorite.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as FavoriteActions from '../actions/favorite-tracks.actions';

export const initialState: string[] = [];

export const favoritesReducer = createReducer(
  initialState,
  on(FavoriteActions.loadFavoritesSuccess, (state, { favorites }) => favorites),
  on(FavoriteActions.addFavorite, (state, { trackId }) => {
    if (state.indexOf(trackId) < 0) {
      // Avoid adding duplicates
      return [...state, trackId];
    }
    return state;
  }),
  on(FavoriteActions.removeFavorite, (state, { trackId }) =>
    state.filter(id => id !== trackId)
  )
  // other state changes...
);
