import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResult } from '../models/loginResult';
import { UserLogin } from '../models/userLogin';

const baseUrl = 'http://localhost:8080/api/v1';
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
}
