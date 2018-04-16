import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';
import { OogstKaartItem, LocationOogstKaartItem } from '../../../../models/models';
import { Utils } from '../../../../models/Util';

@Injectable()
export class OogstkaartService {

  link = 'api/Oogstkaart'

  constructor(public http: HttpClient, public auth: AuthService) { }



  public GetOogstkaartitems() {


    return this.http.get<OogstKaartItem[]>(Utils.getRoot()+ this.link, { headers: this.auth.getAuthorizationHeaders() });


  }
  locationlink = "api/Oogstkaart/Location"
  adminlink = "api/Oogstkaart/mapvi/api/Oogstkaart/productstatusew"
  public postOogstkaartItem(item: OogstKaartItem) {



    return this.http.post<number>(this.link, item, { headers: this.auth.getAuthorizationHeaders() });
  }

  /**
   * PostLocation
oogstkaartid : number   */
  public PostLocation(oogstkaartid: number, location: LocationOogstKaartItem) {
    return this.http.post(Utils.getRoot() + this.locationlink + "?OogstkaartitemID=" + oogstkaartid, location, { headers: this.auth.getAuthorizationHeaders() });
  }

  public GetItems() {
    return this.http.get<OogstKaartItem[]>(Utils.getRoot() + this.link);
  }

  /**
   * getOogstkaartItem
   */
  public getOogstkaartItem(id: number) {
    return this.http.get<OogstKaartItem>(Utils.getRoot() + this.link + '/' + id, { headers: this.auth.getAuthorizationHeaders() });
  }

  public PostSetStatusProduct(id: number) {
    return this.http.post(Utils.getRoot() + '/api/Oogstkaart/productstatus/' + id, {}, { headers: this.auth.getAuthorizationHeaders() })
  }

  /**
   * DeleteItem
   */
  public DeleteItem(id: number) {
    return this.http.post<OogstKaartItem>(Utils.getRoot() + '/api/Oogstkaart/delete/' + id, {}, { headers: this.auth.getAuthorizationHeaders() });
  }

  /**
   * PostFile
   */
  public PostProductPhoto(file: File, id: number) {
    let formData: FormData = new FormData();
    formData.append('uploadFile', file);

    let headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.auth.getToken().access_token);
   // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json')

    return this.http.post(Utils.getRoot() + "/api/Oogstkaart/oogstkaartavatar/"+id, formData,{headers:headers});

  }



}
