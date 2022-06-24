import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Song } from 'src/app/models/song';

let apiLoaded = false;

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css'],
})
export class YoutubePlayerComponent implements OnInit {
  @Input() currentlyPlaying!: Song;
  @Output() youtubePlayer: EventEmitter<YT.Player> = new EventEmitter();
  @Output() StateChange: EventEmitter<YT.PlayerState> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }

  ngAfterViewInit() {}

  onPlayerReady(player: YT.PlayerEvent) {
    this.youtubePlayer.emit(player.target);
  }

  handleVideoEvents(event: any) {
    switch (event.data) {
      case YT.PlayerState.UNSTARTED:
        this.StateChange.emit(YT.PlayerState.UNSTARTED);
        break;
      case YT.PlayerState.PLAYING:
        this.StateChange.emit(YT.PlayerState.PLAYING);
        break;
      case YT.PlayerState.PAUSED:
        this.StateChange.emit(YT.PlayerState.PAUSED);
        break;
      case YT.PlayerState.ENDED:
        this.StateChange.emit(YT.PlayerState.ENDED);
        break;
      case YT.PlayerState.BUFFERING:
        this.StateChange.emit(YT.PlayerState.BUFFERING);
        break;
      case YT.PlayerState.CUED:
        this.StateChange.emit(YT.PlayerState.CUED);
        break;
      default:
        break;
    }
  }
}
