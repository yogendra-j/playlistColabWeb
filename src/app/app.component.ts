import { Component, OnInit } from '@angular/core';
import { PlaySongServiceService } from './services/play-song-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showPlayer = false;
  constructor(private readonly songService: PlaySongServiceService) {}

  ngOnInit(): void {
    this.songService.songToPlayNow.subscribe(
      (state) => this.showPlayer = true
    );
  }

}
