import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
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

  onSubmit() {
    this.employeeFormService.submitForm();
  }
}
