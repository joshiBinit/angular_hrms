import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '../../core/constants/routes.consts';
import { EmployeeListComponent } from './pages/employee-list-component/employee-list-component';
import { EmployeeFormComponent } from './pages/employee-form-component/employee-form-component';
import { EmployeeDetailComponent } from './pages/employee-detail-component/employee-detail-component';

const { DASHBOARD } = ROUTES;

const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'new', component: EmployeeFormComponent },
  { path: ':id', component: EmployeeDetailComponent },
  { path: ':id/edit', component: EmployeeFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
