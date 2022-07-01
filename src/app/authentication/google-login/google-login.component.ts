import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { GoogleApiService } from 'src/app/services/google-login.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {

  constructor(public readonly googleApi: GoogleApiService, private readonly router: Router) {
  }

  ngOnInit(): void {
    if (this.googleApi.isLoggedIn()) { //if valid jwt, try linking to google to get refresh token and access token
      if (window.location.search.includes('code')) {
        let code = window.location.search.split('code=')[1];
        this.googleApi.getAccessTokenByCode(code).subscribe();
      } else if (window.location.search.includes('error')) {
        let error = window.location.search.split('error=')[1];
        console.log(error);
      } else {
        this.googleApi.getAccessToken().pipe(catchError(err => of(""))).subscribe(val => {
          debugger;
          if (val) {
            this.router.navigate(['/']);
          } else {
            this.googleApi.tryConnection();
          }
        });

      }
    } else { //if not valid jwt, try logging in with google
      this.googleApi.tryGoogleLogin()
    }
  }

}
