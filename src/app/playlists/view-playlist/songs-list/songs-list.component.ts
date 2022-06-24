import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CurrentPlayerState } from 'src/app/models/currentPlayerState';
import { Song } from 'src/app/models/song';
import { PlaySongServiceService } from 'src/app/services/play-song-service.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css'],
})
export class SongsListComponent implements OnInit {
  @Input() songsList: Observable<Song[]> = of([]);
  @Input() allowSelection = false;
  @Output() toggleSelectionForSong = new EventEmitter<Song>();
  currentPlayerState!: CurrentPlayerState;
  constructor(private readonly songService: PlaySongServiceService) {}

  ngOnInit(): void {
    this.songService.currentPlayerState.subscribe(
      (state) => (this.currentPlayerState = state)
    );
  }

  toggleSelection(song: Song, event: Event) {
    if (!this.allowSelection) {
      return;
    }
    (event.currentTarget as Element).classList.toggle('selected');
    this.toggleSelectionForSong.emit(song);
  }

  playSong(song: Song) {
    this.songService.songToPlayNow.emit(song);
  }

  pauseSong(){
    this.songService.pauseSong.emit(true);
  }

}
