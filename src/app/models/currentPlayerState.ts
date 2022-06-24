import { Song } from "./song";

export class CurrentPlayerState {
  songInPlayer!: Song;
  isPlaying!: boolean;
  isPaused!: boolean;
  isLoading!: boolean;
}
