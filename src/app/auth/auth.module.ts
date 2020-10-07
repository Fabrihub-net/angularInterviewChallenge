import { NgModule } from '@angular/core';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
