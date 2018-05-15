import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class TokenGuard implements CanActivate {
  
  constructor(private auth: AuthService, public router: Router) { 
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.auth.tokenExpired()) {      
     this.router.navigate(["/auth"])
      return false
    }
      return true;
    

  }
}
