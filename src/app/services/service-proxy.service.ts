import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResult } from '../models/loginResult';
import { Playlist } from '../models/playlist';
import { Song } from '../models/song';
import { UserLogin } from '../models/userLogin';

const baseUrl = environment.baseUrl;
const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

@Injectable({
  providedIn: 'root'
})
export class ServiceProxyService {

  constructor(private readonly httpClient: HttpClient) { }

  loginApi(user: UserLogin) {
    return this.httpClient.post<LoginResult>(baseUrl + '/signin', user, options)
  }

  signUpApi(user: UserLogin) {
    return this.httpClient.post(baseUrl + "/users", user, options);
  }

  createPlaylistApi(playlist: Playlist) {
    return this.httpClient.post(baseUrl + '/myplaylists', playlist, options);
  }

  getAllMyPlaylistsApi() {
    return this.httpClient.get<Playlist[]>(baseUrl + '/myplaylists', options);
  }

  getPlaylistByIdApi(id: number) {
    return this.httpClient.get<Playlist>(baseUrl + '/playlists/' + id, options);
  }

  getSongsFromYoutubePlaylist(playlistId: string) {
    let cachedSongs = localStorage.getItem(playlistId);
    if (cachedSongs) {
      return of(JSON.parse(cachedSongs));
    }
    return this.httpClient.get<Song[]>(baseUrl + '/youtube/' + playlistId).pipe(tap(data => localStorage.setItem(playlistId, JSON.stringify(data))));
  }

}
