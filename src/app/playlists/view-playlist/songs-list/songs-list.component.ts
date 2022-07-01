import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CurrentPlayerState } from 'src/app/models/currentPlayerState';
import { Song } from 'src/app/models/song';
import { PlaySongServiceService } from 'src/app/services/play-song-service.service';
import { SongProviderEnum } from 'src/app/models/SongProviderEnum';
import { ServiceProxyService } from 'src/app/services/service-proxy.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent implements OnInit {
  @Input() songsList: Observable<Song[]> = of([]);
  @Input() isAddSongsView = false;
  @Output() toggleSelectionForSong = new EventEmitter<Song>();
  @Output() deleteSong = new EventEmitter<Song>();
  currentPlayerState!: CurrentPlayerState;
  constructor(
    private readonly songService: PlaySongServiceService,
    private readonly serviceProxy: ServiceProxyService
  ) {}
  readonly SongProviderEnumLocal = SongProviderEnum;
  ngOnInit(): void {
    this.songService.currentPlayerState.subscribe(
      (state) => (this.currentPlayerState = state)
    );
  }

  toggleSelection(song: Song, event: Event) {
    if (!this.isAddSongsView) {
      return;
    }
    (event.currentTarget as Element).classList.toggle('selected');
    this.toggleSelectionForSong.emit(song);
  }

  playSong(song: Song) {
    this.songService.songToPlayNow.emit(song);
  }

  pauseSong() {
    this.songService.pauseSong.emit(true);
  }
  addToQueue(song: Song) {
    this.songService.songAddedToQueue.emit(song);
  }
  convertToYouTube(song: Song) {
    this.serviceProxy.getYoutubeSongFromSpotifyQuery(song).subscribe((data) => {
      song.videoId = data.videoId;
      song.title = data.title;
      song.thumbnailUrlLow = data.thumbnailUrlLow;
      song.thumbnailUrlMedium = data.thumbnailUrlMedium;
      song.songProvider = SongProviderEnum.YOUTUBE;
    });
  }
  isYoutubeSong(song: Song) {
    return song.songProvider.valueOf() === SongProviderEnum.YOUTUBE.valueOf();
  }

}
