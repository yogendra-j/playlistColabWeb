import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Observable, of, tap } from 'rxjs';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Playlist } from 'src/app/models/playlist';
import { Song } from 'src/app/models/song';
import { ServiceProxyService } from 'src/app/services/service-proxy.service';
import { AddSongsComponent } from './add-songs/add-songs.component';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.css'],
})
export class ViewPlaylistComponent implements OnInit {
  playlistId!: number;
  playlist!: Playlist;
  songs!: Observable<Song[]>;
  @ViewChild('openModalButton') openModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeModalButton')
  closeModalButton!: ElementRef<HTMLButtonElement>;
  @ViewChild(AddSongsComponent) addSongsComponent!: AddSongsComponent;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly serviceProxy: ServiceProxyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.playlistId = params['id'];
      this.fetchPlaylist();
    });
  }
  async fetchPlaylist() {
    this.playlist = await firstValueFrom(
      this.serviceProxy.getPlaylistByIdApi(this.playlistId)
    );
    this.songs = of(this.playlist.songs);
  }

  openAddSongsModal() {
    this.openModalButton.nativeElement.click();
  }

  closeAddSongsModal() {
    this.closeModalButton.nativeElement.click();
  }

  addSongsToPlaylist() {
    this.addSongsComponent
      .addSongsToPlaylist(this.playlistId)
      .subscribe((result) => {
        this.playlist = result;
        this.songs = of(result.songs);
        this.closeAddSongsModal();
      });
  }
  addAllSongsToPlaylist() {
    this.addSongsComponent
      .addAllSongsToPlaylist(this.playlistId)
      .subscribe((result) => {
        this.playlist = result;
        this.songs = of(result.songs);
        this.closeAddSongsModal();
      });
  }

  deleteSong(song: Song) {
    this.serviceProxy
      .deleteSongFromPlaylist(this.playlistId, song.videoId)
      .subscribe(() => {
        this.playlist.songs = this.playlist.songs.filter(
          (s) => s.videoId != song.videoId
        );
        this.songs = of(this.playlist.songs);
      });
  }
}
