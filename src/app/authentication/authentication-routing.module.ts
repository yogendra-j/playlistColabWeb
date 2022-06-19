import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLoginComponent } from './google-login/google-login.component';

const routes: Routes = [{
  path: 'google',
  component: GoogleLoginComponent
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
