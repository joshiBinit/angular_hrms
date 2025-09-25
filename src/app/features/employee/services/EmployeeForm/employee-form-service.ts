import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormV2Service } from '../../../../core/services/Form/base-form-builder-service';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../../store/employee.actions';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFormService extends BaseFormV2Service {
  constructor(protected override fb: FormBuilder, private store: Store) {
    super(fb);
  }

  buildEmployeeForm(): FormGroup {
    const config = {
      name: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      joiningDate: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      profilePhoto: [null],
    };

    return this.buildForm(config);
  }

  submitForm(): void {
    if (this.form?.valid) {
      this.store.dispatch(
        EmployeeActions.createEmployee({ employee: this.form.value })
      );
    } else {
      this.form?.markAllAsTouched();
    }
  }
}
