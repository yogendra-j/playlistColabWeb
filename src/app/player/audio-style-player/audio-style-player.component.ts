import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';
import { PlaySongServiceService } from 'src/app/services/play-song-service.service';
@Component({
  selector: 'app-audio-style-player',
  templateUrl: './audio-style-player.component.html',
  styleUrls: ['./audio-style-player.component.css'],
})
export class AudioStylePlayerComponent implements OnInit {
  @Input() currenlyPlaying!: Song;
  currentPlayerState!: YT.PlayerState;
  youtubePlayer!: YT.Player;
  isPlayerReady = false;

  constructor(private readonly songService: PlaySongServiceService) {}

  ngOnInit(): void {
    this.songService.songToPlayNow.subscribe(song => {
      console.log(song);
      this.currenlyPlaying = song;
      if (this.isPlayerReady) {
        this.youtubePlayer.loadVideoById(song.videoId);
        this.youtubePlayer.playVideo();
      }
    });
  }

  handlePlayerStateChange(event: YT.PlayerState) {
    if (event === YT.PlayerState.CUED) {
      return;
    }
    this.songService.currentPlayerState.next({
      isPlaying: this.isPlayerReady && event === YT.PlayerState.PLAYING,
      isPaused: this.isPlayerReady && (event === YT.PlayerState.PAUSED || event === YT.PlayerState.ENDED || event === YT.PlayerState.UNSTARTED),
      isLoading: !this.isPlayerReady || event === YT.PlayerState.BUFFERING,
      songInPlayer: this.currenlyPlaying,
    })

    this.currentPlayerState = event;
  }

  playPauseVideo() {
    if (this.currentPlayerState === YT.PlayerState.PLAYING) {
      this.youtubePlayer.pauseVideo();
    } else if (this.currentPlayerState !== YT.PlayerState.BUFFERING) {
      this.youtubePlayer.playVideo();
    }
  }

  setYouTubePlayer(player: YT.Player) {
    this.youtubePlayer = player;
    this.isPlayerReady = true;
  }
}
