import {Component, EventEmitter, NgZone, OnDestroy, OnInit} from '@angular/core';
import {CurrentUserService} from "../services/current-user.service";
import {environment} from "../../environments/environment";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  readonly clientId = environment.google_auth_client_id;
  credentialResponse = new EventEmitter<string>();
  subs: Subscription[] = [];

  constructor(private userService: CurrentUserService, private zone: NgZone) {
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {
    this.subs.push(
      this.credentialResponse.subscribe(clientId => this.userService.setCurrentUser(clientId))
    );

    (<any>window).handleCredentialResponse = (credentials: { clientId: string, credential: string }) => {
      console.log('handleCredentialResponse', credentials);
      this.zone.run(() => this.credentialResponse.emit(credentials.clientId));
      // todo: add credential validation
      // todo: move validation and user login to backend
    }

    let node = document.createElement('script');
    node.src = 'https://accounts.google.com/gsi/client';
    node.type = 'text/javascript';
    node.async = true;
    node.defer = true;
    document.getElementById('scriptLoader')?.appendChild(node);
  }
}
