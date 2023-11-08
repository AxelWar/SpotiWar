// favorite-songs.actions.ts

import { createAction, props } from '@ngrx/store';

export const loadFavorites = createAction('[Favorite Songs] Load Favorites');

export const updateFavoritesSuccess = createAction(
  '[Favorite Songs] Update Favorites Success',
  props<{ favorites: string[] }>()
);

export const updateFavoritesFailure = createAction(
  '[Favorite Songs] Update Favorites Failure',
  props<{ error: any }>()
);

export const addFavorite = createAction(
  '[Favorite Songs] Add Favorite',
  props<{ songId: string }>()
);

export const removeFavorite = createAction(
  '[Favorite Songs] Remove Favorite',
  props<{ songId: string }>()
);
