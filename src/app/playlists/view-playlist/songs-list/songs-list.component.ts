import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  @Input () songsList: Observable<Song[]> = of([]);
  @Input () allowSelection = false;
  @Output () toggleSelectionForSong = new EventEmitter<Song>();
  constructor() { }

  ngOnInit(): void {
  }

  toggleSelection(song: Song, event: Event){
    (event.currentTarget as Element).classList.toggle('selected');
    if (!this.allowSelection){
      return;
    }
    this.toggleSelectionForSong.emit(song);
  }

}
