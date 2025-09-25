// shared/utils/form.utils.ts

import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Helper to normalize control list (string | string[]) → string[]
 */
function toArray(controls: string[] | string): string[] {
  return Array.isArray(controls) ? controls : [controls];
}

/**
 * Disable one or multiple controls in a FormGroup
 */
export function disableControls(
  form: FormGroup,
  controls: string[] | string
): void {
  toArray(controls).forEach((controlName) => {
    const control: AbstractControl | null = form.get(controlName);
    if (control) {
      control.disable();
    }
  });
}

/**
 * Enable one or multiple controls in a FormGroup
 */
export function enableControls(
  form: FormGroup,
  controls: string[] | string
): void {
  toArray(controls).forEach((controlName) => {
    const control: AbstractControl | null = form.get(controlName);
    if (control) {
      control.enable();
    }
  });
}

/**
 * Reset one or multiple controls in a FormGroup
 * Resets to initial state (value = null by default, pristine, untouched).
 */
export function resetControls(
  form: FormGroup,
  controls: string[] | string
): void {
  toArray(controls).forEach((controlName) => {
    const control: AbstractControl | null = form.get(controlName);
    if (control) {
      control.reset();
    }
  });
}
