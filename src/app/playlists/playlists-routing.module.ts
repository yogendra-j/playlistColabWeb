import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../authentication/guard/auth-guard.guard';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { ViewPlaylistComponent } from './view-playlist/view-playlist.component';

const routes: Routes = [{
  path: 'myplaylists',
  component: MyPlaylistsComponent,
  canActivate: [AuthGuardGuard]
 },
 {
  path: ':id',
  component: ViewPlaylistComponent,
  canActivate: [AuthGuardGuard]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
