import { createSelector } from '@ngrx/store';
import { State } from '../reducers/favorite-tracks.reducer';

export const selectFeature = (state: any) => state.favoriteSongs;

export const selectFavoriteTracks = createSelector(
  selectFeature,
  (state: State) => state.favorites
);
