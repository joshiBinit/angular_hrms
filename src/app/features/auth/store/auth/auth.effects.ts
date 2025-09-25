import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

import { SnackbarService } from 'notification';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ROUTES } from '../../../../core/constants/routes.consts';
import { AuthService } from '../../services/Auth/auth-service';

const { LOGIN, DASHBOARD } = ROUTES;
@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ username, email, password, confirmPassword }) => {
        if (password !== confirmPassword) {
          return of(
            AuthActions.signupFailure({ error: 'Passwords do not match' })
          );
        }

        return this.authService.signup({ username, email, password }).pipe(
          map(() =>
            AuthActions.signupSuccess({
              message: 'Signup successful! Please login',
            })
          ),
          catchError((err) =>
            of(
              AuthActions.signupFailure({
                error: err.error?.message || 'Signup failed',
              })
            )
          )
        );
      })
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(({ message }) => {
          this.snackbar.show(message, 'success');
          this.router.navigate([LOGIN]);
        })
      ),
    { dispatch: false }
  );

  signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupFailure),
        tap(({ error }) => {
          this.snackbar.show(error, 'error');
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) => {
        return this.authService.login({ email, password }).pipe(
          map(() =>
            AuthActions.loginSuccess({
              message: 'Login successful! ',
            })
          ),
          catchError((err) =>
            of(
              AuthActions.loginFailure({
                error: err.error?.message || 'Login failed',
              })
            )
          )
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ message }) => {
          this.snackbar.show(message, 'success');
          this.router.navigate([DASHBOARD]);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          this.snackbar.show(error, 'error');
        })
      ),
    { dispatch: false }
  );
}
