import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take, map } from 'rxjs';
import { AppState } from '../store/app.state';
import { isLoggedIn } from '../store/selectors/auth.selectors';
import * as AuthActions from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(isLoggedIn).pipe(
      take(1),
      map(authenticated => {
        if (!authenticated) {
          console.log('Modal here');
          this.store.dispatch(AuthActions.loginRedirect());
          return false;
        }
        return true;
      })
    );
  }
}
