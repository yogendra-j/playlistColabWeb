import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';

@Component({
  selector: 'app-playlist-info',
  templateUrl: './playlist-info.component.html',
  styleUrls: ['./playlist-info.component.css']
})
export class PlaylistInfoComponent implements OnInit {

  @Input() playlist!: Playlist;
  @Output() openAddSongsModal = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

}
