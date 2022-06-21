import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Playlist } from 'src/app/models/playlist';
import { ServiceProxyService } from 'src/app/services/service-proxy.service';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})
export class AddPlaylistComponent implements OnInit {

  playlist = new Playlist();
  isSubmitted = false;
  @ViewChild('name') name!: FormControl;

  constructor(private readonly serviceProxy: ServiceProxyService) { }

  ngOnInit(): void {
  }

  async createPlaylist() {
    this.isSubmitted = true;
    if (this.name.invalid){
      return false;
    }
    await firstValueFrom(this.serviceProxy.createPlaylistApi(this.playlist));
    this.playlist.name = '';
    this.isSubmitted = false;
    return true;
  }

}
