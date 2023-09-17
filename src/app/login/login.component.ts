import {Component} from '@angular/core';
import {CurrentUserService} from "../services/current-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private currentUserService: CurrentUserService) {
  }

  login() {
    this.currentUserService.setCurrentUser('i7');
  }

  logout() {
    this.currentUserService.setCurrentUser();
  }
}
