import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.urlHasToekn(this.router.url)) {
      this.auth.saveGoogleTokenInfoFromUrl(this.router.url);
    }

    return this.auth.isGoogleTokenValid();
  }
  urlHasToekn(urlString: string): boolean {
    var url = new URL(urlString);
    var token = new URLSearchParams(url.search).get('access_token')
    return token!= null && token != "";
  }
}
