// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromAuth from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.selectAuthToken),
      map(token => {
        if (!token) {
          // If there's no token, redirect to Spotify login
          this.router.navigate(['/login']); // Adjust the route as needed
          return false;
        }
        // Token found, allow access to route
        return true;
      }),
      take(1) // Complete the observable to prevent ongoing subscription
    );
  }
}
