import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrentPlayerState } from '../models/currentPlayerState';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class PlaySongServiceService {

  songToPlayNow = new EventEmitter<Song>();
  pauseSong = new EventEmitter<boolean>();
  currentPlayerState = new EventEmitter<CurrentPlayerState>();
  constructor() { }
}
