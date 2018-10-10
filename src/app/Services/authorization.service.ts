import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class  AuthorizationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`https://localhost:44357/api/auth/signin`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('appAccess', JSON.stringify(user.access_token));
                    localStorage.setItem('appRefresh', JSON.stringify(user.refresh_token));
                }

                return user;
            }));
    }

    iauthorised():boolean{
        if (localStorage.getItem('appAccess')) {          
            const helper = new JwtHelperService();
            const expirationDate = helper.getTokenExpirationDate(localStorage.getItem('appAccess'));

            const current_time = new Date();
            if (current_time > expirationDate) {  
                return false;
              }
            return true;
        }
        return false;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('appAccess');
        localStorage.removeItem('appRefresh');
        console.log(123);
    }
}