import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './components/generic-table-component/generic-table-component';
import { SidebarComponent } from './components/sidebar-component/sidebar-component';
import { Wrapper } from './components/wrapper/wrapper';
import { Inputs } from './components/inputs/inputs';
import { MaterialModule } from './material/material-module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading-component/loading-component';
import { AppSelectComponent } from './components/inputs/app-select-component/app-select-component';
import { HeaderComponent } from './components/header-component/header-component';
import { AppInputText } from './components/inputs/app-input-text/app-input-text';
import { AppInputNumber } from './components/inputs/app-input-number/app-input-number';
import { AppInputDate } from './components/inputs/app-input-date/app-input-date';
import { ReactiveFormsModule } from '@angular/forms';
import { AppInputFile } from './components/inputs/app-input-file/app-input-file';

@NgModule({
  declarations: [
    GenericTableComponent,
    SidebarComponent,
    Wrapper,
    Inputs,
    LoadingComponent,
    HeaderComponent,
    AppInputText,
    AppInputNumber,
    AppInputDate,
    AppInputFile,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AppSelectComponent,
    ReactiveFormsModule,
  ],
  exports: [
    LoadingComponent,
    GenericTableComponent,
    SidebarComponent,
    AppSelectComponent,
    HeaderComponent,
    AppInputDate,
    AppInputText,
    AppInputNumber,
    AppInputFile,
  ],
})
export class SharedModule {}
