import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as EmployeeActions from '../../store/employee.actions';
import * as EmployeeSelectors from '../../store/employee.selectors';
import { Employee } from '../../../../shared/models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list-component',
  standalone: false,
  templateUrl: './employee-list-component.html',
  styleUrl: './employee-list-component.scss',
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;
  loading$: Observable<boolean>;

  columns = [
    { field: 'sn', header: 'SN' },
    { field: 'name', header: 'Name' },
    { field: 'department', header: 'Department' },
    { field: 'role', header: 'Role' },
  ];

  actions = [
    { type: 'view', label: 'View', color: 'primary' },
    { type: 'edit', label: 'Edit', color: 'accent' },
    { type: 'delete', label: 'Delete', color: 'warn' },
  ];

  constructor(private store: Store, private router: Router) {
    this.employees$ = this.store.select(EmployeeSelectors.selectAllEmployees);
    this.loading$ = this.store.select(EmployeeSelectors.selectEmployeesLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
  }

  onTableAction(event: { type: string; row: Employee }) {
    // console.log('type', event.type);
    // console.log('row', event.row);

    switch (event.type) {
      case 'view':
        this.router.navigate(['/employees', event.row._id]);
        break;
      case 'edit':
        console.log('Edit', event.row);
        break;
      case 'delete':
        console.log('Delete', event.row);
        break;
    }
  }
}
