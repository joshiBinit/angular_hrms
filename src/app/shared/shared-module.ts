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

@NgModule({
  declarations: [
    GenericTableComponent,
    SidebarComponent,
    Wrapper,
    Inputs,
    LoadingComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule, AppSelectComponent],
  exports: [
    LoadingComponent,
    GenericTableComponent,
    SidebarComponent,
    AppSelectComponent,
  ],
})
export class SharedModule {}
