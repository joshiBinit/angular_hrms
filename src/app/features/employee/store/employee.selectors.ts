import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';
export const EMPLOYEE_SELECTOR_KEY = 'employees';
export const selectEmployeeState = createFeatureSelector<EmployeeState>(
  EMPLOYEE_SELECTOR_KEY
);

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state) => state.employees
);

export const selectEmployeesLoading = createSelector(
  selectEmployeeState,
  (state) => state.loading
);

export const selectEmployeesError = createSelector(
  selectEmployeeState,
  (state) => state.error
);
