import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    if (this.googleApi.isLoggedIn()) {
      this.router.navigateByUrl("");
    } else {
      this.googleApi.tryGoogleLogin()
    }
  }

}
