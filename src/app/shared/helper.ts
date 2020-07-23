import { Router, RouterEvent } from '@angular/router';

/**
 * Whent the server is down this function
 * navigates the user to the login page and clears the token
 */
export function errorLogin(router: Router) {
    window.localStorage.removeItem('token');
    router.navigate(['login']);
}