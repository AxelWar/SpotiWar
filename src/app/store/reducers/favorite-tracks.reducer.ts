import { createReducer, on } from '@ngrx/store';
import * as FavoriteTracksActions from '../actions/favorite-tracks.actions';

export const favoritesFeatureKey = 'favorites';

export interface State {
  favorites: string[];
  error: any; // Replace with an appropriate error type if needed
}

export const initialState: State = {
  favorites: [],
  error: '',
};

export const favoriteTracksReducer = createReducer(
  initialState,
  on(FavoriteTracksActions.updateFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites: favorites,
    error: '',
  })),
  on(FavoriteTracksActions.updateFavoritesFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(FavoriteTracksActions.addFavorite, (state, { songId }) => ({
    ...state,
    favorites: state.favorites.includes(songId)
      ? state.favorites
      : [...state.favorites, songId],
  })),
  on(FavoriteTracksActions.removeFavorite, (state, { songId }) => ({
    ...state,
    favorites: state.favorites.filter(id => id !== songId),
  }))
);
