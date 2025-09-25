import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { SignupComponent } from './pages/signup-component/signup-component';
import { ROUTES } from '../../core/constants/routes.consts';

const { LOGIN, SIGNUP } = ROUTES;

const routes: Routes = [
  { path: LOGIN, component: LoginComponent },
  { path: SIGNUP, component: SignupComponent },
  { path: '', redirectTo: LOGIN, pathMatch: 'full' },
  { path: '**', redirectTo: LOGIN },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
