import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser: CurrentUser | undefined;
  private _currentUser$ = new BehaviorSubject<CurrentUser | undefined>(undefined);

  constructor() {
  }

  get currentUser$(): Observable<CurrentUser | undefined> {
    return this._currentUser$;
  }

  setCurrentUser(id?: number) {
    if (id) {
      this.currentUser = new CurrentUser(id);
    } else {
      this.currentUser = undefined;
    }
    this._currentUser$.next(this.currentUser);
  }

  getCurrentUser(): CurrentUser | undefined {
    return this.currentUser;
  }
}

export class CurrentUser {
  constructor(private _id: number) {
  }

  get id(): number {
    return this._id;
  }
}
