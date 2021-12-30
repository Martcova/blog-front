import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private cookieservice: CookieService, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.revisacookiesession();
  }

  revisacookiesession():boolean{
    try{
        const token = this.cookieservice.check('token');

        if(!token){
          this.router.navigate(['/']);
        }
        
        return token
    }catch(e){
      console.log('sucedio un error',e);
      return false;
    }

  }


  
}
