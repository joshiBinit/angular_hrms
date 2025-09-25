import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as EmployeeActions from '../../../employee/store/employee.actions';
import * as EmployeeSelectors from '../../../employee/store/employee.selectors';

@Component({
  selector: 'app-dashboard-page-component',
  standalone: false,
  templateUrl: './dashboard-page-component.html',
  styleUrl: './dashboard-page-component.scss',
})
export class DashboardPageComponent {
  employees$: Observable<any[]>;
  loading$: Observable<boolean>;

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'department', header: 'Department' },
    { field: 'role', header: 'Role' },
  ];

  constructor(private store: Store) {
    this.employees$ = this.store.select(EmployeeSelectors.selectAllEmployees);
    this.loading$ = this.store.select(EmployeeSelectors.selectEmployeesLoading);
  }

  ngOnInit() {
    this.store.dispatch(EmployeeActions.loadEmployees());
  }
}
