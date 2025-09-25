import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';
import { SharedModule } from '../shared/shared-module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material-module';
import { CoreRoutingModule } from './core-routing-module';
import { SidebarComponent } from './layout/sidebar-component/sidebar-component';

@NgModule({
  declarations: [MainLayoutComponent, SidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    CoreRoutingModule,
  ],
})
export class CoreModule {}
