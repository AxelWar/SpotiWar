// favorite.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';
import * as FavoriteActions from '../actions/favorite-tracks.actions';
import { AppState } from '../app.state';
@Injectable()
export class FavoriteEffects {
  saveFavoritesToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FavoriteActions.addFavorite, FavoriteActions.removeFavorite),
        withLatestFrom(this.store.select(state => state.favorite)),
        tap(([action, favorite]) => {
          localStorage.setItem('favs', JSON.stringify(favorite));
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}
