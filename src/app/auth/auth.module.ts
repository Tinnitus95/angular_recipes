import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ]
})

export class AuthModule {}
