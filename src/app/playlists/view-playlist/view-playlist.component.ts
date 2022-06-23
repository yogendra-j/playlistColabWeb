import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Playlist } from 'src/app/models/playlist';
import { ServiceProxyService } from 'src/app/services/service-proxy.service';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.css']
})
export class ViewPlaylistComponent implements OnInit {

  playlistId!: number;
  playlist!: Playlist;
  @ViewChild('openModalButton') openModalButton!: ElementRef<HTMLButtonElement>;

  constructor(private readonly route: ActivatedRoute, private readonly serviceProxy: ServiceProxyService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.playlistId = params['id'];
      this.fetchPlaylist();

    } );
  }
  async fetchPlaylist() {
    this.playlist = await firstValueFrom(this.serviceProxy.getPlaylistByIdApi(this.playlistId));
  }

  openAddSongsModal() {
    this.openModalButton.nativeElement.click();
  }

}
