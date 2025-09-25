import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
export const AUTH_SELECTOR_KEY = 'auth';

export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_SELECTOR_KEY);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
