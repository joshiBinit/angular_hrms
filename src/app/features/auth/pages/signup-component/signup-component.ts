import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import * as AuthActions from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';

import { SignupFormService } from '../../services/SignupForm/signup-form-service';
import { ROUTES } from '../../../../core/constants/routes.consts';

@Component({
  selector: 'app-sign-in-component',
  standalone: false,
  templateUrl: './signup-component.html',
  styleUrls: ['./signup-component.scss'],
})
export class SignupComponent implements OnInit {
  readonly LOGIN = ROUTES.LOGIN;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private formService: SignupFormService, private store: Store) {}

  ngOnInit(): void {
    this.formService.buildSignInForm();
  }

  get signupForm(): FormGroup {
    return this.formService.form;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit() {
    const data = this.formService.getFormDataForSignup();
    if (data) this.store.dispatch(AuthActions.signup(data));
  }
}
