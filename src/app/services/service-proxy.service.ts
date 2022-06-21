import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginResult } from '../models/loginResult';
import { Playlist } from '../models/playlist';
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
}
