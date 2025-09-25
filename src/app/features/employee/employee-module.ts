import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './pages/employee-list-component/employee-list-component';
import { EmployeeDetailComponent } from './pages/employee-detail-component/employee-detail-component';
import { EmployeeFormComponent } from './pages/employee-form-component/employee-form-component';
import { SharedModule } from '../../shared/shared-module';
import { EmployeeRoutingModule } from './employee-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material-module';
import { StoreModule } from '@ngrx/store';
import { EMPLOYEE_SELECTOR_KEY } from './store/employee.selectors';
import { employeeReducer } from './store/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/employee.effects';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(EMPLOYEE_SELECTOR_KEY, employeeReducer),
    EffectsModule.forFeature(EmployeeEffects),
  ],
})
export class EmployeeModule {}
