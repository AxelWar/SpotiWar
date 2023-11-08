// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      map(() => {
        const token = localStorage.getItem('auth');
        if (token) {
          // Dispatch login success if token exists
          return AuthActions.loginSuccess({ token });
        } else {
          // Redirect to Spotify auth if no token found
          return AuthActions.loginRedirect();
        }
      })
    )
  );

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
        // You could also dispatch an action to save the token in the state instead of using localStorage here.
        // For example: this.store.dispatch(AuthActions.saveToken({ token }));
        localStorage.setItem('auth', token);
      }),
      map(({ token }) => {
        // Dispatch an action to start the token expiration timer
        return AuthActions.startTokenTimer({ token });
      })
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
          localStorage.removeItem('auth');
          this.authService.redirectToSpotifyAuth(); // or do other logout logic as needed
        })
      ),
    { dispatch: false }
  );

  // Handle more effects as needed...
}
