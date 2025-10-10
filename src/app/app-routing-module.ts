import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout-component/main-layout-component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module').then((m) => m.AuthModule),
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard-module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./features/employee/employee-module').then(
            (m) => m.EmployeeModule
          ),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./features/department/department-module').then(
            (m) => m.DepartmentModule
          ),
      },
      {
        path: 'attendance',
        loadChildren: () =>
          import('./features/attendance/attendance-module').then(
            (m) => m.AttendanceModule
          ),
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import('./features/payroll/payroll-module').then(
            (m) => m.PayrollModule
          ),
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // fallback
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
