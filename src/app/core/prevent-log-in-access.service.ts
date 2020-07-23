import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

//Guard implementation to prevent logged in user from navigating to login or registration page
@Injectable({
  providedIn: 'root'
})
export class PreventLogInAccess implements CanActivate {

  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    let token = window.localStorage.getItem('token');
      if (token) {
        this.router.navigate(['/list-user']);
        return false;
      } else {
      return true;
    }
  }
} 