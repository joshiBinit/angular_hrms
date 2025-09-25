// shared/services/base-form-v2.service.ts

import { Injectable } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import {
  disableControls,
  enableControls,
  resetControls,
} from '../../utils/form.utils';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseFormV2Service {
  // private encapsulated form instance
  #formGroup?: FormGroup;

  protected constructor(protected fb: FormBuilder) {}

  get form(): FormGroup | undefined {
    return this.#formGroup;
  }
  protected set form(formGroup: FormGroup | undefined) {
    this.#formGroup = formGroup;
  }

  /** Build a form from config (struct of controls + validators) */
  buildForm<T extends object>(
    config: T,
    options?: AbstractControlOptions | null
  ): FormGroup {
    this.form = this.fb.group(config, options);
    return this.form;
  }

  /** Light reset: keeps structure, resets values */
  reset(): void {
    this.form?.reset();
  }

  /** Hard reset: destroys the form reference */
  hardReset(): void {
    this.form = undefined;
  }

  /** Disable selected controls */
  disableControls(controls: string[] | string): void {
    if (!this.form) return;
    disableControls(this.form, controls);
  }

  /** Enable selected controls */
  enableControls(controls: string[] | string): void {
    if (!this.form) return;
    enableControls(this.form, controls);
  }

  /** Reset selected controls to initial value */
  resetControls(controls: string[] | string): void {
    if (!this.form) return;
    resetControls(this.form, controls);
  }

  /** Quick check for validity, also marks all fields as touched & dirty */
  checkInvalidStatus(): boolean {
    this.applyTouchAndDirtyToForm();
    return this.form?.invalid ?? false;
  }

  /** Propagates touched & dirty flags to all controls */
  protected applyTouchAndDirtyToForm(): void {
    this.form?.markAllAsTouched();
    this.form?.markAsDirty();
  }

  /** Current form values */
  getFormValue<T>(): T {
    return this.form?.value as T;
  }
}
