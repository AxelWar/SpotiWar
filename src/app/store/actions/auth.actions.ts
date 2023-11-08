// auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const initAuth = createAction('[Auth] Init Auth');
export const loginRedirect = createAction('[Auth] Login Redirect');
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);
export const logout = createAction('[Auth] Logout');
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
export const startTokenTimer = createAction(
  '[Auth] Start Token Timer',
  props<{ token: string }>()
);
