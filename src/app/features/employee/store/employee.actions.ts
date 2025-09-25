import { createAction, props } from '@ngrx/store';
import { Employee } from '../../../shared/models/employee.model';

// Load Employees
export const loadEmployees = createAction('[Employee] Load Employees');
export const loadEmployeesSuccess = createAction(
  '[Employee] Load Employees Success',
  props<{ employees: Employee[] }>()
);
export const loadEmployeesFailure = createAction(
  '[Employee] Load Employees Failure',
  props<{ error: any }>()
);

// Create Employee
export const createEmployee = createAction(
  '[Employee] Create Employee',
  props<{ employee: Employee }>()
);
export const createEmployeeSuccess = createAction(
  '[Employee] Create Employee Success',
  props<{ employee: Employee }>()
);
export const createEmployeeFailure = createAction(
  '[Employee] Create Employee Failure',
  props<{ error: any }>()
);

// Update Employee
export const updateEmployee = createAction(
  '[Employee] Update Employee',
  props<{ employee: Employee }>()
);
export const updateEmployeeSuccess = createAction(
  '[Employee] Update Employee Success',
  props<{ employee: Employee }>()
);
export const updateEmployeeFailure = createAction(
  '[Employee] Update Employee Failure',
  props<{ error: any }>()
);

// Delete Employee
export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ id: number }>()
);
export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Employee Success',
  props<{ id: number }>()
);
export const deleteEmployeeFailure = createAction(
  '[Employee] Delete Employee Failure',
  props<{ error: any }>()
);
