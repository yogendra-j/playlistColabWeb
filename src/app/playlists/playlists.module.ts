import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { AddPlaylistComponent } from './add-playlist/add-playlist.component';
import { FormsModule } from '@angular/forms';
import { ViewPlaylistComponent } from './view-playlist/view-playlist.component';
import { PlaylistInfoComponent } from './view-playlist/playlist-info/playlist-info.component';
import { SongsListComponent } from './view-playlist/songs-list/songs-list.component';


@NgModule({
  declarations: [
    MyPlaylistsComponent,
    AddPlaylistComponent,
    ViewPlaylistComponent,
    PlaylistInfoComponent,
    SongsListComponent,
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule,
    FormsModule
  ]
})
export class PlaylistsModule { }
