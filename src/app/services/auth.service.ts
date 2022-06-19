import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
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

  saveGoogleTokenInfoFromUrl(url: string) {
    return;
  }

}
