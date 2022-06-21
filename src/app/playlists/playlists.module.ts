import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { AddPlaylistComponent } from './add-playlist/add-playlist.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyPlaylistsComponent,
    AddPlaylistComponent
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule,
    FormsModule
  ]
})
export class PlaylistsModule { }
