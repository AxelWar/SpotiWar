// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { EMPTY, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      switchMap(() => this.store.select(state => state.spotify.token)),
      map(token =>
        token
          ? AuthActions.loginSuccess({ token })
          : AuthActions.loginRedirect()
      ),
      switchMap(action => (action ? of(action) : EMPTY)) // If no action found, return an empty observable
    )
  );

  // Handle redirection to Spotify authentication page
  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRedirect),
        tap(() => this.authService.redirectToSpotifyAuth())
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ token }) => {
        // Token is being saved in the state by the reducer, no action needed here
      }),
      map(({ token }) => AuthActions.startTokenTimer({ token })) // Start the logout timer
    )
  );

  startTokenTimer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.startTokenTimer),
      exhaustMap(action =>
        of(action).pipe(
          // Delay here would be the duration your token is valid minus a small offset to ensure you log out before it actually expires.
          // Assuming the token lasts for an hour, you would set this to something like 55 minutes (3300000 milliseconds).
          delay(3300000),
          map(() => AuthActions.logout())
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          // No need to interact with localStorage
          // Perform necessary cleanup if needed, like redirecting to auth page
          this.authService.redirectToSpotifyAuth(); // Redirect to login after logout
        })
      ),
    { dispatch: false }
  );
}
