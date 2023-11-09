// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { EMPTY, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectAuthToken } from '../selectors/auth.selectors';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      switchMap(() => this.authService.getTokenFromUrl()),
      switchMap(token => {
        // Dispatch loginSuccess with the token if we have one, otherwise redirect to Spotify login
        return token
          ? of(AuthActions.loginSuccess({ token }))
          : of(AuthActions.loginRedirect());
      })
    )
  );
  // Handle redirection to Spotify authentication page
  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRedirect),
        tap(() => {
          console.log('redirect');
          this.authService.redirectToSpotifyAuth();
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
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
          console.log('logout');
          this.authService.redirectToSpotifyAuth();
        })
      ),
    { dispatch: false }
  );
}
