import { createAction, props } from '@ngrx/store';

export const loadEmployees = createAction('[Employee] Load Employees');

export const loadEmployeesSuccess = createAction(
  '[Employee] Load Success',
  props<{ employees: any[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employee] Load Failure',
  props<{ error: any }>()
);

export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: any }>()
);

export const addEmployeeSuccess = createAction(
  '[Employee] Add Employee Success',
  props<{ employee: any }>()
);

export const addEmployeeFailure = createAction(
  '[Employee] Add Employee Failure',
  props<{ error: any }>()
);

export const updateEmployee = createAction(
  '[Employee] Update Employee',
  props<{ employee: any }>()
);

export const updateEmployeeSuccess = createAction(
  '[Employee] Update Employee Success',
  props<{ employee: any }>()
);

export const updateEmployeeFailure = createAction(
  '[Employee] Update Employee Failure',
  props<{ error: any }>()
);

export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ id: string | number }>()
);

export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Employee Success',
  props<{ id: string | number }>()
);

export const deleteEmployeeFailure = createAction(
  '[Employee] Delete Employee Failure',
  props<{ error: any }>()
);
