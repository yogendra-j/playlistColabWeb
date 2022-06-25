import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';
import { Song } from 'src/app/models/song';
import { PlaySongServiceService } from 'src/app/services/play-song-service.service';
@Component({
  selector: 'app-audio-style-player',
  templateUrl: './audio-style-player.component.html',
  styleUrls: ['./audio-style-player.component.css'],
})
export class AudioStylePlayerComponent implements OnInit, OnDestroy {
 currenlyPlaying!: Song;
  currentPlayerState!: YT.PlayerState;
  youtubePlayer!: YT.Player;
  isPlayerReady = false;
  songProgress = 0;
  songDuration = 1;
  intervallTimer = interval(500);
  subscriptions: Subscription[] = [];

  constructor(private readonly songService: PlaySongServiceService) {}

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
      this.songDuration = this.youtubePlayer.getDuration();
      this.songProgress = (this.youtubePlayer.getCurrentTime() / this.songDuration) * 100;
    }
  }
}
