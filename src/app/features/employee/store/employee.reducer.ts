import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from './employee.actions';
import { Employee } from '../../../shared/models/employee.model';

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: any;
}

export const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeeReducer = createReducer(
  initialState,

  // Load
  on(EmployeeActions.loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
  })),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Create
  on(EmployeeActions.createEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
  })),
  on(EmployeeActions.createEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Update
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((e) =>
      e._id === employee._id ? employee : e
    ),
  })),
  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Delete
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((e) => e._id !== id.toString()),
  })),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
