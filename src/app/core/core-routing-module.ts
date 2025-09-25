import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './constants/routes.consts';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';

const { DASHBOARD } = ROUTES;
const routes: Routes = [
  // {
  //   path: '',
  //   component: MainLayoutComponent,
  //   children: [
  //     {
  //       path: DASHBOARD,
  //       loadChildren: () =>
  //         import('../features/dashboard/dashboard-module').then(
  //           (m) => m.DashboardModule
  //         ),
  //     },
  //     {
  //       path: 'employees',
  //       loadChildren: () =>
  //         import('../features/employee/employee-module').then(
  //           (m) => m.EmployeeModule
  //         ),
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
