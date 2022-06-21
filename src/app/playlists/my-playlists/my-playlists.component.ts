import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Playlist } from 'src/app/models/playlist';
import { ServiceProxyService } from 'src/app/services/service-proxy.service';
import { AddPlaylistComponent } from '../add-playlist/add-playlist.component';

@Component({
  selector: 'app-my-playlists',
  templateUrl: './my-playlists.component.html',
  styleUrls: ['./my-playlists.component.css']
})
export class MyPlaylistsComponent implements OnInit {

  @ViewChild(AddPlaylistComponent) addPlaylistComponent!: AddPlaylistComponent;
  @ViewChild('closeModalButton') closeModalButton!: ElementRef;
  myPlaylists: Observable<Playlist[]> = of([]);
  constructor(private readonly serviceProxy: ServiceProxyService) { }

  ngOnInit(): void {
    this.fetchMyPlaylists();
  }

  private fetchMyPlaylists() {
    this.myPlaylists = this.serviceProxy.getAllMyPlaylistsApi();
  }

  async createPlaylist() {
    //if created successfully, then close modal
    if (await this.addPlaylistComponent.createPlaylist()){
      this.closeModalButton.nativeElement.click();
      this.fetchMyPlaylists();
    }
  }

}
