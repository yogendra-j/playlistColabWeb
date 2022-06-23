import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';

@Component({
  selector: 'app-playlist-info',
  templateUrl: './playlist-info.component.html',
  styleUrls: ['./playlist-info.component.css']
})
export class PlaylistInfoComponent implements OnInit {

  @Input() 
  set playlist(playlist: Playlist | null) {
    this._playlist = playlist ?? new Playlist();
  }
  get playlist(){
    return this._playlist;
  }

  private _playlist!: Playlist;
  @Output() openAddSongsModal = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

}
