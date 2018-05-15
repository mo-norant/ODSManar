import { Injectable } from '@angular/core';
import { isUndefined } from 'util';
import { AuthService } from './auth/auth.service';

@Injectable()
export class GeneralService {

  constructor(private auth: AuthService) { }




  private _role: string;
  public get role(): string {

    if (isUndefined(this._role)) {
      if (this.auth.decodeToken().role === 'administrator') {
        this._role = 'administrator';
      }
      else {
        this._role = 'user';
      }
    }


    return this._role;
  }
  public set role(v: string) {
    this._role = v;
  }



}
