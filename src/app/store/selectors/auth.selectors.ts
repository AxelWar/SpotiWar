// auth.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
