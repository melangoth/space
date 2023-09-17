import {Component, OnInit} from '@angular/core';
import {CurrentUserService} from "../services/current-user.service";

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {

  constructor(private userService: CurrentUserService) {
  }

  ngOnInit() {
    (<any>window).handleCredentialResponse = (credentials: { clientId: string, credential: string }) => {
      this.userService.setCurrentUser(credentials.clientId);
      // todo: add credential validation
      // todo: it sets the user, but somehow not triggering the side panel to update, only by forcing to reroute the app upon setting the user
    }

    let node = document.createElement('script');
    node.src = 'https://accounts.google.com/gsi/client';
    node.type = 'text/javascript';
    node.async = true;
    node.defer = true;
    document.getElementById('scriptLoader')?.appendChild(node);
  }
}
