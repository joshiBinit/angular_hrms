import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../../store/employee.actions';
import { EmployeeFormService } from '../../services/EmployeeForm/employee-form-service';

@Component({
  selector: 'app-employee-form-component',
  standalone: false,
  templateUrl: './employee-form-component.html',
  styleUrl: './employee-form-component.scss',
})
export class EmployeeFormComponent implements OnInit {
  form?: FormGroup;
  isEdit = false;
  empId!: string | null;
  departments = ['HR', 'Finance', 'IT', 'Operations'];
  departmentOptions: { value: string; label: string }[] = [];

  constructor(
    private employeeFormService: EmployeeFormService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.buildEmployeeForm();
    this.departmentOptions = this.departments.map((d) => ({
      value: d,
      label: d,
    }));
    this.empId = this.route.snapshot.paramMap.get('id');
  }
  get department(): FormControl {
    return this.form?.get('department') as FormControl;
  }

  get name(): FormControl {
    return this.form?.get('name') as FormControl;
  }

  get role(): FormControl {
    return this.form?.get('role') as FormControl;
  }

  get joiningDate(): FormControl {
    return this.form?.get('joiningDate') as FormControl;
  }

  get salary(): FormControl {
    return this.form?.get('salary') as FormControl;
  }

  get profilePhoto(): FormControl {
    return this.form?.get('profilePhoto') as FormControl;
  }

  buildEmployeeForm() {
    this.form = this.employeeFormService.buildEmployeeForm();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.form?.patchValue({ profilePhoto: file });
      this.form?.get('profilePhoto')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (!this.form) return;

    const employeeData = this.form.value;

    this.store.dispatch(
      EmployeeActions.createEmployee({ employee: employeeData })
    );
  }
}
