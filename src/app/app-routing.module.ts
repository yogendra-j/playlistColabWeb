import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
 },
 {
  path: 'playlists',
  loadChildren: () => import('./playlists/playlists.module').then(m => m.PlaylistsModule)
 }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
