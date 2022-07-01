import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { PlaySongServiceService } from 'src/app/services/play-song-service.service';

@Component({
  selector: 'app-playlist-info',
  templateUrl: './playlist-info.component.html',
  styleUrls: ['./playlist-info.component.css']
})
export class PlaylistInfoComponent implements OnInit {

  @Input()
  set playlist(playlist: Playlist | null) {
    this._playlist = playlist ?? new Playlist();
    this.playlistCover = this.getPlaylistCover();
  }
  get playlist(){
    return this._playlist;
  }
  private _playlist!: Playlist;
  playlistCover = "https://i.ytimg.com/vi/tSsNYRUIrlk/maxresdefault.jpg";
  @Output() openAddSongsModal = new EventEmitter<boolean>();
  constructor(private readonly songService: PlaySongServiceService) { }

  ngOnInit(): void {
  }

  playAll() {
    this._playlist.songs.forEach((song, index) => {
      if (index === 0) {
        this.songService.songToPlayNow.emit(song);
      } else {
      this.songService.songAddedToQueue.emit(song);
      }
    });
  }

  getPlaylistCover() {
    if (!this._playlist.songs || this._playlist.songs.length === 0) {
      return "https://i.ytimg.com/vi/tSsNYRUIrlk/maxresdefault.jpg";
    }
    //return random song mediumthumnail
    let randomSong = this._playlist.songs[Math.floor(Math.random() * this._playlist.songs.length)];
    return randomSong.thumbnailUrlMedium ?? "https://i.ytimg.com/vi/tSsNYRUIrlk/maxresdefault.jpg";
  }

}
