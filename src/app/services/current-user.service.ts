import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() {
  }

  getCurrentUser(): CurrentUser | undefined {
    return new CurrentUser(7);
  }
}

export class CurrentUser {
  constructor(private _id: number) {
  }

  get id(): number {
    return this._id;
  }
}
