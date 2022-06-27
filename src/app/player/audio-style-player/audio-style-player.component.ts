import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';
import { Song } from 'src/app/models/song';
import { PlaySongServiceService } from 'src/app/services/play-song-service.service';
import { MinuteSecondsPipe } from 'src/app/shared-module/pipes/minute-seconds.pipe';
@Component({
  selector: 'app-audio-style-player',
  templateUrl: './audio-style-player.component.html',
  styleUrls: ['./audio-style-player.component.css'],
  providers: [MinuteSecondsPipe],
})
export class AudioStylePlayerComponent implements OnInit, OnDestroy {
  queuedSongs: Song[] = [];
  currenlyPlaying!: Song;
  currentPlayerState!: YT.PlayerState;
  youtubePlayer!: YT.Player;
  isPlayerReady = false;
  songProgress = 0;
  songDuration = 1;
  intervallTimer = interval(1000);
  volumn = 100;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly songService: PlaySongServiceService,
    private formatToMinSecPipe: MinuteSecondsPipe
  ) {}

  ngOnInit(): void {
    this.handlePressPlayInSongsList();
    this.handlePressPauseInSongsList();
    this.subscriptions.push(
      this.intervallTimer.subscribe(() => {
        this.updateProgressBar();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private handlePressPauseInSongsList() {
    this.songService.pauseSong.subscribe(() => {
      if (this.isPlayerReady) {
        this.youtubePlayer.pauseVideo();
      }
    });
  }

  private handlePressPlayInSongsList() {
    this.songService.songToPlayNow.subscribe((song) => {
      if (song.videoId === this.currenlyPlaying?.videoId) {
        this.playPauseVideo();
        return;
      }
      this.currenlyPlaying = song;
      if (this.isPlayerReady) {
        this.youtubePlayer.loadVideoById(song.videoId); //load new song
        this.youtubePlayer.playVideo(); //play new song
        this.songDuration = this.youtubePlayer.getDuration();
      }
    });
  }

  handlePlayerStateChange(event: YT.PlayerState) {
    if (event === YT.PlayerState.CUED) {
      return;
    }
    this.songService.currentPlayerState.emit({
      isPlaying: this.isPlayerReady && event === YT.PlayerState.PLAYING,
      isPaused:
        this.isPlayerReady &&
        (event === YT.PlayerState.PAUSED ||
          event === YT.PlayerState.ENDED ||
          event === YT.PlayerState.UNSTARTED),
      isLoading: !this.isPlayerReady || event === YT.PlayerState.BUFFERING,
      songInPlayer: this.currenlyPlaying,
    });

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

  updateProgressBar() {
    if (this.currentPlayerState === YT.PlayerState.PLAYING) {
      this.songProgress = this.youtubePlayer.getCurrentTime();
    }
    if (!this.songDuration) {
      this.songDuration = this.youtubePlayer.getDuration();
    }
  }

  setVolumn(event: MatSliderChange) {
    if (event.value == null) return;
    this.youtubePlayer.setVolume(event.value);
  }

  toggleVolumn() {
    if (this.volumn === 0) {
      this.volumn = 100;
    } else {
      this.volumn = 0;
    }
    this.youtubePlayer.setVolume(this.volumn);
  }

  seekTo(event: MatSliderChange) {
    if (event.value == null) return;
    this.youtubePlayer.seekTo(event.value, true);
  }

  formatLabel = (value: number) => {
    return this.formatToMinSecPipe.transform(value);
  };

}
