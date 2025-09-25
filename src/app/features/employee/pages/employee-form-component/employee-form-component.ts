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

@Component({
  selector: 'app-employee-form-component',
  standalone: false,
  templateUrl: './employee-form-component.html',
  styleUrl: './employee-form-component.scss',
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  empId!: string | null;
  departments = ['HR', 'Finance', 'IT', 'Operations'];
  departmentOptions: { value: string; label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.empId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.empId;

    this.form = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
    });
    this.departmentOptions = this.departments.map((d) => ({
      value: d,
      label: d,
    }));

    if (this.isEdit) {
    }
  }
  get department(): FormControl {
    return this.form?.get('department') as FormControl;
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.store.dispatch(
          EmployeeActions.updateEmployee({
            employee: { id: this.empId, ...this.form.value },
          })
        );
      } else {
        this.store.dispatch(
          EmployeeActions.addEmployee({ employee: this.form.value })
        );
      }
    }
  }
}
