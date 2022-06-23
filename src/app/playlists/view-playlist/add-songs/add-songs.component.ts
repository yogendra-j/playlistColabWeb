import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
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
  songsToAdd: Set<String> = new Set<String>();

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

  toggleSelectionForSong(videoId: string){
    if (this.songsToAdd.has(videoId)){
      this.songsToAdd.delete(videoId);
    } else {
      this.songsToAdd.add(videoId);
    }
    console.log(this.songsToAdd);
  }

}
