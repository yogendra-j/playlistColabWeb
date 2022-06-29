import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { LoginComponent } from './login/login.component';
import { SpotifyLoginComponent } from './spotify-login/spotify-login.component';

const routes: Routes = [{
  path: 'google',
  component: GoogleLoginComponent
 },
 {
  path: 'spotify',
  component: SpotifyLoginComponent
 },
 {
  path: '',
  component: LoginComponent
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
