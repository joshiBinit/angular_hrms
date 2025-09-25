import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { LogInFormService } from '../../services/LoginForm/login-form-service';
import { ROUTES } from '../../../../core/constants/routes.consts';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss'],
})
export class LoginComponent implements OnInit {
  readonly SIGNUP = ROUTES.SIGNUP;
  hidePassword: boolean = true;

  constructor(private formService: LogInFormService, private store: Store) {}

  ngOnInit(): void {
    this.formService.buildLogInForm();
  }

  get loginForm(): FormGroup {
    return this.formService.form;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    const data = this.formService.getFormDataForLogin();
    if (data) this.store.dispatch(AuthActions.login(data));
  }
}
