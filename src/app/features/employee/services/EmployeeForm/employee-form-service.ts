import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseFormService } from '../../../../core/services/Form/base-form-builder-service';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../../store/employee.actions';
import { IncomeValidator } from '../../utils/income-validator';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFormService extends BaseFormService {
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
      profilePhoto: [null, [Validators.required]],
      experiences: this.fb.array([]),
      incomes: this.fb.array([], IncomeValidator.incomeConsistency()),
    };

    return this.buildForm(config);
  }

  buildExperienceForm(): FormGroup {
    return this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  buildIncomeForm(): FormGroup {
    return this.fb.group({
      frequency: [null, Validators.required],
      interval: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
    });
  }

  submitForm(form: FormGroup | undefined, selectedFile: File | null) {
    const formData = new FormData();

    for (const key in form?.value) {
      if (form.value[key] !== null && form.value[key] !== undefined) {
        formData.append(key, form.value[key]);
      }
    }

    const experiences = form?.value.experiences || [];
    formData.append('experiences', JSON.stringify(experiences));

    if (selectedFile) {
      formData.append('profilePhoto', selectedFile);
    }

    this.store.dispatch(
      EmployeeActions.createEmployeeWithFile({ payload: formData })
    );
  }
}
