import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser: CurrentUser | undefined;
  private _currentUser$ = new BehaviorSubject<CurrentUser | undefined>(undefined);
  private users = new Map<string, string>();

  constructor(private router: Router) {
    this.users.set('i7', 'Demo User');
    this.users.set('<google-user-id>', 'Google User')
  }

  get currentUser$(): Observable<CurrentUser | undefined> {
    return this._currentUser$;
  }

  setCurrentUser(id?: string) {
    let name = (id) ? this.users.get(id) : undefined;
    this.currentUser = (id && name) ? new CurrentUser(id, name) : undefined;

    this._currentUser$.next(this.currentUser);
  }

  getCurrentUser(): CurrentUser | undefined {
    return this.currentUser;
  }
}

export class CurrentUser {
  constructor(
    private _id: string,
    private _name: string
  ) {
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
