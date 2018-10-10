import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('appAccess')) {
            // logged in so return true
            const helper = new JwtHelperService();
            const expirationDate = helper.getTokenExpirationDate(localStorage.getItem('appAccess'));

            const current_time = new Date();
            console.log(expirationDate+ " " + current_time)
            if (current_time > expirationDate) {                
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                return false;
              }
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}