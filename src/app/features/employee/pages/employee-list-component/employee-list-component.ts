import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as EmployeeActions from '../../store/employee.actions';
import * as EmployeeSelectors from '../../store/employee.selectors';

@Component({
  selector: 'app-employee-list-component',
  standalone: false,
  templateUrl: './employee-list-component.html',
  styleUrl: './employee-list-component.scss',
})
export class EmployeeListComponent implements OnInit {
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

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
  }
}
