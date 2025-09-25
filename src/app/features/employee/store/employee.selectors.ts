import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';
export const EMPLOYEE_SELECTOR_KEY = 'employees';
export const selectEmployeeState = createFeatureSelector<EmployeeState>(
  EMPLOYEE_SELECTOR_KEY
);

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees
);

export const selectEmployeesLoading = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.loading
);
export const selectEmployeeById = (id: string) =>
  createSelector(selectEmployeeState, (state) =>
    state.employees.find((e) => e.id == id)
  );
