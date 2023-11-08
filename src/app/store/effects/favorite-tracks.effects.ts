import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as FavoriteSongsActions from '../actions/favorite-tracks.actions';
import { State } from '../reducers/favorite-tracks.reducer';
import { selectFavoriteTracks } from '../selectors/favorite-tracks.selectors';

@Injectable()
export class FavoriteTracksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>
  ) {}

  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteSongsActions.addFavorite),
      withLatestFrom(this.store.select(selectFavoriteTracks)),
      mergeMap(([action, currentFavorites]) => {
        const updatedFavorites = [...currentFavorites, action.songId];
        return of(
          FavoriteSongsActions.updateFavoritesSuccess({
            favorites: updatedFavorites,
          })
        );
      })
    )
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteSongsActions.removeFavorite),
      withLatestFrom(this.store.select(selectFavoriteTracks)),
      mergeMap(([action, currentFavorites]) => {
        const updatedFavorites = currentFavorites.filter(
          (id: string) => id !== action.songId
        );
        return of(
          FavoriteSongsActions.updateFavoritesSuccess({
            favorites: updatedFavorites,
          })
        );
      })
    )
  );
}
