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
  providers: [MinuteSecondsPipe]
})
export class AudioStylePlayerComponent implements OnInit, OnDestroy {
 currenlyPlaying!: Song;
  currentPlayerState!: YT.PlayerState;
  youtubePlayer!: YT.Player;
  isPlayerReady = false;
  songProgress = 0;
  songDuration = 1;
  intervallTimer = interval(1000);
  subscriptions: Subscription[] = [];

  constructor(private readonly songService: PlaySongServiceService,
    private formatToMinSecPipe: MinuteSecondsPipe) {
    }

  ngOnInit(): void {
    this.handlePressPlayInSongsList();
    this.handlePressPauseInSongsList();
    this.subscriptions.push(this.intervallTimer.subscribe(() => {
      this.updateProgressBar();
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private handlePressPauseInSongsList() {
    this.songService.pauseSong.subscribe(() => {
      if (this.isPlayerReady) {
        this.youtubePlayer.pauseVideo();
      }
    });
  }

  private handlePressPlayInSongsList() {
    this.songService.songToPlayNow.subscribe(song => {
      if (song.videoId === this.currenlyPlaying?.videoId) {
        this.playPauseVideo();
        return;
      }
      this.currenlyPlaying = song;
      if (this.isPlayerReady) {
        this.youtubePlayer.loadVideoById(song.videoId); //load new song
        this.youtubePlayer.playVideo();  //play new song
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

  updateProgressBar(){
    if (this.currentPlayerState === YT.PlayerState.PLAYING) {
      this.songProgress = this.youtubePlayer.getCurrentTime();
    }
    if (!this.songDuration) {
      this.songDuration = this.youtubePlayer.getDuration();
    }
  }

  seekTo(event: MatSliderChange) {
    if (event.value == null) return;
    this.youtubePlayer.seekTo(event.value, true);
  }

  formatLabel = (value: number) => {
    return this.formatToMinSecPipe.transform(value);
  }

  // show hover time value in progress bar
  pregressBarMouseEnterHandler(event: MouseEvent) {
    const progressBarWrapper = document.querySelector('.mat-slider-track-wrapper') as HTMLElement;
    if (progressBarWrapper) {
      const progressBarWrapperRect = progressBarWrapper.getBoundingClientRect();
      const progressBarWidth = progressBarWrapperRect.right - progressBarWrapperRect.left;
      const progressBarX = event.clientX - progressBarWrapperRect.left;
      const progressBarPercent = progressBarX / progressBarWidth;
      const progressBarTime = this.songDuration * progressBarPercent;
      const progressBarTimeFormatted = this.formatToMinSecPipe.transform(progressBarTime);
      const tooltipElement = document.querySelector('.tooltiptextProgressBar') as HTMLElement;
      if (tooltipElement) {
        tooltipElement.innerText = progressBarTimeFormatted;
        //set position of tooltip if time is valid
        if (progressBarTime > 0 && progressBarTime < this.songDuration) {
          tooltipElement.style.left = `${event.clientX - parseInt(this.getStyle(document.querySelector('.container-fluid') as HTMLElement, 'padding-left'))}px`;
        } else {
          tooltipElement.style.left = '-300px';
        }
      }
    }
  }
  // hide hover time value in progress bar
  pregressBarMouseLeaveHandler(event: MouseEvent) {
    const tootltipElement = document.querySelector('.tooltiptextProgressBar') as HTMLElement;
    if (tootltipElement) {
      tootltipElement.innerText = '';
      tootltipElement.style.left = '-300px';
    }
  }

  getStyle(element: HTMLElement, style: string){
    return window.getComputedStyle(element, null).getPropertyValue(style);
}
}
