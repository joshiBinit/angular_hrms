// shared/services/employee-form.service.ts

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormV2Service } from '../../../../core/services/Form/base-form-builder-service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFormService extends BaseFormV2Service {
  constructor(protected override fb: FormBuilder) {
    super(fb);
  }

  buildEmployeeForm(): FormGroup {
    const config = {
      name: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      joiningDate: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      profilePhoto: [null, [Validators.required]],
    };

    return this.buildForm(config);
  }
}
