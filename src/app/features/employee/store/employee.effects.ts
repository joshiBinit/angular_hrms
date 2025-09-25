import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as EmployeeActions from './employee.actions';
import { EmployeeService } from '../services/Employee/employee-service';

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  constructor(private employeeService: EmployeeService) {}

  // Load employees
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      mergeMap(() =>
        this.employeeService.getEmployees().pipe(
          map((employees) =>
            EmployeeActions.loadEmployeesSuccess({ employees })
          ),
          catchError((error) =>
            of(EmployeeActions.loadEmployeesFailure({ error }))
          )
        )
      )
    )
  );

  // Create employee
  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.createEmployee),
      mergeMap(({ employee }) =>
        this.employeeService.createEmployee(employee).pipe(
          map((newEmployee) =>
            EmployeeActions.createEmployeeSuccess({ employee: newEmployee })
          ),
          catchError((error) =>
            of(EmployeeActions.createEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  // Update employee
  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      mergeMap(({ employee }) => {
        if (!employee._id) {
          return of(
            EmployeeActions.updateEmployeeFailure({
              error: 'Employee ID missing',
            })
          );
        }
        return this.employeeService.updateEmployee(employee._id, employee).pipe(
          map((updated) =>
            EmployeeActions.updateEmployeeSuccess({ employee: updated })
          ),
          catchError((error) =>
            of(EmployeeActions.updateEmployeeFailure({ error }))
          )
        );
      })
    )
  );

  // Delete employee
  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      mergeMap(({ id }) =>
        this.employeeService.deleteEmployee(id.toString()).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess({ id })),
          catchError((error) =>
            of(EmployeeActions.deleteEmployeeFailure({ error }))
          )
        )
      )
    )
  );
}
