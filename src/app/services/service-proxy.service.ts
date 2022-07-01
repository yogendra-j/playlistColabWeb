import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddSongsDto } from '../models/addSongsDto';
import { GoogleLogin } from '../models/googleLogin';
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

  getSoptifyTokenByCode(code: string) {
    return this.httpClient.post(baseUrl + `/spotify/accesstoken?code=${code}`, options);
  }
  getGoogleTokenByCode(code: string) {
    return this.httpClient.post(baseUrl + `/youtube/accesstoken?code=${code}`, options);
  }

  getSoptifyToken() {
    return this.httpClient.get(baseUrl + `/spotify/accesstoken`);
  }
  getGoogleToken() {
    return this.httpClient.get(baseUrl + `/youtube/accesstoken`);
  }

  googleLoginApi(id_token: string) {
    return this.httpClient.post<LoginResult>(baseUrl + '/google/signin?idToken=' + id_token, options);
  }

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

  getSongsFromSpotifyPlaylist(playlistId: string) {
    let cachedSongs = localStorage.getItem(playlistId);
    if (cachedSongs) {
      return of(JSON.parse(cachedSongs));
    }
    return this.httpClient.get<Song[]>(baseUrl + '/spotify/' + playlistId).pipe(tap(data => localStorage.setItem(playlistId, JSON.stringify(data))));
  }

  addSongsToPlaylistApi(playlistId: number, addNewSongs: AddSongsDto) {
    return this.httpClient.post<Playlist>(baseUrl + '/playlists/' + playlistId + '/songs', addNewSongs, options);
  }

  getYoutubeSongFromSpotifyQuery(spotifySong: Song) {
    return this.httpClient.get<Song>(baseUrl + `/youtube/spotify?spotifySongQuery=${spotifySong.songQuery}`, options);
  }

  deleteSongFromPlaylist(playlistId: Number, songId: string) {
    return this.httpClient.delete<Song[]>(baseUrl + '/playlists/' + playlistId + '/songs/' + songId, options)
  }

}
