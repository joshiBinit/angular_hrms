import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'notification';

@Injectable({
  providedIn: 'root',
})
export class SignupFormService {
  #form: FormGroup | null = null;

  constructor(private fb: FormBuilder, private snackbar: SnackbarService) {}

  get form(): FormGroup {
    if (!this.#form) {
      throw new Error('Form not created');
    }
    return this.#form;
  }

  set form(form: FormGroup) {
    this.#form = form;
  }

  buildSignInForm(): FormGroup {
    this.#form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });

    return this.form;
  }

  getFormDataForSignup(): {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  } | null {
    if (!this.form.valid) {
      this.snackbar.show('Please fill all fields correctly', 'error');
      return null;
    }

    const { username, email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.snackbar.show('Passwords do not match', 'error');
      return null;
    }

    return { username, email, password, confirmPassword };
  }
}
