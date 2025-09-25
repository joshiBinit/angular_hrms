import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'notification';

@Injectable({
  providedIn: 'root',
})
export class LogInFormService {
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

  buildLogInForm(): FormGroup {
    this.#form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    return this.form;
  }

  getFormDataForLogin(): {
    email: string;
    password: string;
  } | null {
    if (!this.form.valid) {
      this.snackbar.show('Please enter valid credentials', 'error');
      return null;
    }

    const { email, password } = this.form.value;

    return { email, password };
  }
}
