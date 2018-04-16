import { Injectable } from '@angular/core';
import { OogstKaartItem } from '../../../models/models';

@Injectable()
export class LandermapService {

  constructor() { }

  
  private _oogstkaartitem : OogstKaartItem;
  public get oogstkaartitem() : OogstKaartItem {
    return this._oogstkaartitem;
  }
  public set oogstkaartitem(v : OogstKaartItem) {
    this._oogstkaartitem = v;
  }
  
  
  private _navigation =     [{
      'title' : 'Login',
      'type' : 'item',
      'icon' : 'assignment_ind',
      'url' : '/auth'
  },
  {
    'title' : 'Register',
    'type' : 'item',
    'icon' : 'add',
    'url' : '/auth/register'
},]
  public get navigation() {
    return this._navigation;
  }
  public set navigation(v ) {
    this._navigation = v;
  }
  

}
