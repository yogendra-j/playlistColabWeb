import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { SoptifyLoginService } from 'src/app/services/spotify-login.service';

@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify-login.component.html',
  styleUrls: ['./spotify-login.component.css'],
})
export class SpotifyLoginComponent implements OnInit {
  constructor(private readonly spotifyService: SoptifyLoginService, private readonly reouter: Router) {}

  ngOnInit(): void {
    if (window.location.search.includes('code')) {
      let code = window.location.search.split('code=')[1];
      this.spotifyService.getAccessTokenByCode(code).subscribe();
    } else if (window.location.search.includes('error')) {
      let error = window.location.search.split('error=')[1];
      console.log(error);
    } else {
      this.spotifyService.getAccessToken().pipe(catchError(err => of(""))).subscribe(val => {
        if (val) {
          this.reouter.navigate(['/']);
        } else {
          this.spotifyService.tryLogin();
        }
      });

    }
  }
}
