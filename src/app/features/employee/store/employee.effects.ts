import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EmployeeActions from './employee.actions';
import { of, delay, map, catchError } from 'rxjs';

@Injectable()
export class EmployeeEffects {
  private actions$ = inject(Actions);
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),

      delay(1000),
      map(() =>
        EmployeeActions.loadEmployeesSuccess({
          employees: [
            { id: 1, name: 'Alice', department: 'HR', role: 'Manager' },
            { id: 2, name: 'Bob', department: 'IT', role: 'Developer' },
            { id: 3, name: 'Claire', department: 'Finance', role: 'Analyst' },
          ],
        })
      ),
      catchError((error) => of(EmployeeActions.loadEmployeesFailure({ error })))
    )
  );
}
