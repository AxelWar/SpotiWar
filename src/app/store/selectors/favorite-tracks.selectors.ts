// favorite.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState, FavoriteState } from '../app.state';

// Typing for the props to be passed with selectors that require them
export interface FavoriteIdProps {
  trackId: string;
}

// The selector for the favorite state
export const selectFavoriteState = (state: AppState) => state.favorite;

// Selector for all favorites
export const selectFavorites = createSelector(
  selectFavoriteState,
  (favoriteState: FavoriteState) =>
    favoriteState ? favoriteState.favoriteTracks : []
);

// Selector to check if a song is a favorite. Notice the use of props here to type check correctly.
export const isFavorite = createSelector(
  selectFavorites,
  (favorites: string[], props: FavoriteIdProps) =>
    favorites.includes(props.trackId)
);
