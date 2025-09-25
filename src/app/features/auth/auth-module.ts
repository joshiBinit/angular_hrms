import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './pages/signup-component/signup-component';
import { LoginComponent } from './pages/login-component/login-component';
import { MaterialModule } from '../../shared/material/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AUTH_SELECTOR_KEY } from './store/auth/auth.selectors';
import { authReducer } from './store/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthRoutingModule } from './auth-routing-module';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    StoreModule.forFeature(AUTH_SELECTOR_KEY, authReducer),
    EffectsModule.forFeature(AuthEffects),
  ],
})
export class AuthModule {}
