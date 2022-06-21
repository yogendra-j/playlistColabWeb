import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../authentication/guard/auth-guard.guard';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';

const routes: Routes = [{
  path: '',
  component: MyPlaylistsComponent,
  canActivate: [AuthGuardGuard]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
