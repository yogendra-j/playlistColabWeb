import { Injectable } from '@angular/core';
import { LoginResult } from '../models/loginResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor() { }
  jwtTokenKey = "PLAYLIST_COLAB_JWT";
  jwtTokenExpiration = "PLAYLIST_COLAB_JWT_EXPIRATION";
  googleTokenKey = "GOOGLE_ACCESS_TOKEN";
  googleTokenExirationKey = "GOOGLE_ACCESS_TOKEN_EXPIRATION";

  getItemFromLocalStroage(key: string): string {
    let item = localStorage.getItem(key);
    return item != null ? item : "";
  }

  setItemInLocalStroage(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  isGoogleTokenValid(): boolean {
    let expirationInMiliSec = Number.parseInt(this.getItemFromLocalStroage(this.googleTokenExirationKey));
    return !(isNaN(expirationInMiliSec) || Date.now() > expirationInMiliSec);
  }

  setJwtToken(token: LoginResult): void {
    this.setItemInLocalStroage(this.jwtTokenKey, token.accessToken);
    this.setItemInLocalStroage(this.jwtTokenExpiration, (1000 * token.expireInSeconds + Date.now()).toString());
  }

  isJwtTokenValid(): boolean {
    let expirationInMiliSec = Number.parseInt(this.getItemFromLocalStroage(this.jwtTokenExpiration));
    return !(isNaN(expirationInMiliSec) || Date.now() > expirationInMiliSec);
  }

  saveGoogleTokenInfoFromUrl(url: string) {
    return;
  }

}
