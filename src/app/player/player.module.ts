import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { AudioStylePlayerComponent } from './audio-style-player/audio-style-player.component';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [
    AudioStylePlayerComponent,
    YoutubePlayerComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    YouTubePlayerModule,
    SharedModuleModule
  ],
  exports: [
    AudioStylePlayerComponent
  ]
})
export class PlayerModule { }
