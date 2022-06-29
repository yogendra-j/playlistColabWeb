import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { of, tap } from 'rxjs';
import { GoogleLogin } from '../models/googleLogin';
import { AuthService } from './auth.service';
import { ServiceProxyService } from './service-proxy.service';

const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.spotify.com',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,

  // clientId: 'server.code',
  clientId: '3924afb2b3d6401f8c7c297864c04a28',
};

export interface UserInfo {
  info: {
    sub: string;
    email: string;
    name: string;
    picture: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SoptifyLoginService {
  constructor(
    private readonly oAuthService: OAuthService,
    private readonly router: Router,
    private readonly serviceProxy: ServiceProxyService,
    private readonly authService: AuthService,
    private readonly httpClient: HttpClient
  ) {}
  loginUrl = '/login/spotify';
  spotifyToken = "";
  spotifyExpiresAt = 0;

  getAccessTokenByCode(code: string) {
    return this.serviceProxy
      .getSoptifyTokenByCode(code)
      .pipe(tap((token: any) => {this.spotifyToken, this.spotifyExpiresAt = token.access_token, token.expires_in}));
  }

  getAccessToken(){
    if (this.spotifyToken && this.spotifyExpiresAt > Date.now()) {
      return of(this.spotifyToken);
    } else {
      return this.serviceProxy.getSoptifyToken().pipe(tap((token: any) => {this.spotifyToken, this.spotifyExpiresAt = token.access_token, token.expires_in}));
    }
  }

  tryLogin() {
    let client_id = '3924afb2b3d6401f8c7c297864c04a28';
    let redirect_uri = window.location.origin + this.loginUrl;

    let scope = 'user-read-private user-read-email';

    let url =
      'https://accounts.spotify.com/authorize?' +
      'response_type=code' +
      '&' +
      'client_id=' +
      client_id +
      '&' +
      'scope=' +
      scope +
      '&' +
      'redirect_uri=' +
      redirect_uri;
    window.location.href = url;
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }
}
