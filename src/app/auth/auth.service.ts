import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Company } from '../models/models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Utils } from '../models/Util';

@Injectable()
export class AuthService {

  helper : JwtHelperService = new JwtHelperService();

  private connectlink = 'connect/token'
  private client_id =  'AngularSPA'
  private grant_type =  'password'
  private scope  = 'WebAPI'
  



  constructor(private http: HttpClient) { }

  public createUser(user : RegisterUser){
    return this.http.post(Utils.getRoot()  + "Identity/Create", user);
  }

  public createCompany(company : Company, id: string){
    return this.http.post(Utils.getRoot()  + "Identity/Companyinfo?id=" + id , company);
  }


  public login(username: string, password: string){

    const body = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('scope', this.scope)
    .set('client_id', this.client_id)
    .set('grant_type', this.grant_type)


    return this.http.post<JWTToken>(Utils.getRoot().replace("/api", "") + this.connectlink, body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })

  }

  public saveToken(token: JWTToken){
    localStorage.setItem('jwttoken', JSON.stringify(token));
  }

  public getToken() : JWTToken {
    if(this.hasToken()){
      return JSON.parse(localStorage.getItem('jwttoken'));
    }
    return null;
  }

  public tokenExpired(){

    if(!this.hasToken()){
      return true;
    }

    if(this.helper.isTokenExpired(this.getToken().access_token)){
      this.removeToken();
      return true;
    }
    return false

  }

  public decodeToken(){
    return this.helper.decodeToken(this.getToken().access_token);
  }

  public hasToken(){
    if (localStorage.getItem("jwttoken") !== null) {
      return true
    }
    return false;
  }

  public removeToken(){
    localStorage.removeItem('jwttoken')
  }

  public getUserInfo(){
    return this.http.get(Utils.getRoot()  + '/General/user', {headers: this.getAuthorizationHeaders()});
  }

   public postCompany(company: Company){
    return this.http.post(Utils.getRoot() + '/General/registercompany', company, {headers: this.getAuthorizationHeaders()});
   }

   public hasCompany(){
    return this.http.get<boolean>(Utils.getRoot()+ '/General/hascompany', {headers: this.getAuthorizationHeaders()});
   }
  
  public getAuthorizationHeaders() : HttpHeaders{
    return new HttpHeaders({
       'Authorization': 'Bearer ' + this.getToken().access_token
     })
   

   

 }

  

}



export class JWTToken{
 
  
  constructor(public access_token: string,
    public expires_in : number,
   public token_type: string){}
}


export class RegisterUser {

  constructor(public email: string,
      public password: string,
      public password2: string,
      public name: string) { }


}