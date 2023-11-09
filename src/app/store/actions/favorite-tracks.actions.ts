// favorite.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadFavorites = createAction('[Favorite] Load Favorites');
export const loadFavoritesSuccess = createAction(
  '[Favorite] Load Favorites Success',
  props<{ favorites: string[] }>()
);
export const addFavorite = createAction(
  '[Favorite] Add Favorite',
  props<{ trackId: string }>()
);
export const removeFavorite = createAction(
  '[Favorite] Remove Favorite',
  props<{ trackId: string }>()
);
