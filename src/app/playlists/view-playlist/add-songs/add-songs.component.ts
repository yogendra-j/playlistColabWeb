import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AddSongsDto } from 'src/app/models/addSongsDto';
import { Song } from 'src/app/models/song';
import { ServiceProxyService } from 'src/app/services/service-proxy.service';

@Component({
  selector: 'app-add-songs',
  templateUrl: './add-songs.component.html',
  styleUrls: ['./add-songs.component.css']
})
export class AddSongsComponent implements OnInit {
  
  searchUrl!: string;
  songsList: Observable<Song[]> = of([]);
  songsToAdd = new Map<string, Song>();
  
  constructor(private readonly serviceProxy: ServiceProxyService) { }
  
  ngOnInit(): void {
  }
  
  getSongsFromUrl(){
    if (this.searchUrl.includes('youtube.com/watch?v=')){
      console.log(this.searchUrl.split('youtube.com/watch?v=')[1]);
    } else if (this.searchUrl.includes('youtube.com/playlist?list=')){
      let plsylistId = this.searchUrl.split('youtube.com/playlist?list=')[1];
      this.songsList = this.serviceProxy.getSongsFromYoutubePlaylist(plsylistId);
    }
  }
  
  toggleSelectionForSong(song: Song){
    if (this.songsToAdd.has(song.videoId)){
      this.songsToAdd.delete(song.videoId);
    } else {
      this.songsToAdd.set(song.videoId, song);
    }
  }
   
  addSongsToPlaylist(playlistId: number) {
    let songsToAddDto = new AddSongsDto();
    songsToAddDto.songs = Array.from(this.songsToAdd.values());
    return this.serviceProxy.addSongsToPlaylistApi(playlistId, songsToAddDto);
  }
}
