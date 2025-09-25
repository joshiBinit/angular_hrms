import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page-component/dashboard-page-component';
import { SharedModule } from '../../shared/shared-module';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { StoreModule } from '@ngrx/store';
import { EMPLOYEE_SELECTOR_KEY } from '../employee/store/employee.selectors';
import { employeeReducer } from '../employee/store/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from '../employee/store/employee.effects';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature(EMPLOYEE_SELECTOR_KEY, employeeReducer),
    EffectsModule.forFeature(EmployeeEffects),
  ],
})
export class DashboardModule {}
