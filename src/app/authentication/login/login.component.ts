import { Component, OnInit } from '@angular/core';
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
  user: UserLogin = new UserLogin();
  constructor(private readonly serviceProxy: ServiceProxyService, private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleFormType() {
    this.isLoginForm = !this.isLoginForm;
  }

  submitForm() {
    if(this.isLoginForm)
      this.serviceProxy.loginApi(this.user).subscribe(token => this.authService.setItemInLocalStroage(this.authService.jwtTokenKey, token.accessToken));
    else this.serviceProxy.signUpApi(this.user).subscribe(x => console.log(x));
  }

}
