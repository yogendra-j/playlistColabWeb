import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/userLogin';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceProxyService } from 'src/app/services/service-proxy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginForm = true;
  isLoginFailed = false;
  user: UserLogin = new UserLogin();
  constructor(private readonly serviceProxy: ServiceProxyService,
    private readonly authService: AuthService,
    private readonly router: Router) { }

  ngOnInit(): void {
    if (this.authService.isJwtTokenValid()) {
      this.router.navigate([""]);
    }
  }

  toggleFormType() {
    this.isLoginForm = !this.isLoginForm;
    this.isLoginFailed = false;
  }

  submitForm() {
    debugger;
    if(this.isLoginForm)
      this.serviceProxy.loginApi(this.user).subscribe(token => {
        this.authService.setJwtToken(token);
        this.router.navigate([""]);
      },
      error => this.isLoginFailed = true);
    else this.serviceProxy.signUpApi(this.user).subscribe(x => console.log(x));
  }

}
