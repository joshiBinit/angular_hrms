import { createAction, props } from '@ngrx/store';

export const signup = createAction(
  '[Auth] Signup',
  props<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ message: string }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);

export const login = createAction(
  '[Auth] Signup',
  props<{
    email: string;
    password: string;
  }>()
);

export const loginSuccess = createAction(
  '[Auth] Signup Success',
  props<{ message: string }>()
);

export const loginFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);
