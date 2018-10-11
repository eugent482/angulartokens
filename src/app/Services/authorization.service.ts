import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { ICurrentUser } from '../Components/CurrentUser'
@Injectable()
export class  AuthorizationService {
    constructor(private http: HttpClient, private router: Router) { }


    login(username: string, password: string):Observable<ICurrentUser> {
        return this.http.post<ICurrentUser>(`https://localhost:44357/api/auth/signin`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    refreshToken() : Observable<ICurrentUser> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.refresh_token;
      
     
        return this.http.post<ICurrentUser>("https://localhost:44357/api/auth/refresh", { refresh: token })
          .pipe(
            map(user => {
     
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
     
              return <ICurrentUser>user;
          }));
      }

      getAuthToken() : string {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(currentUser != null) {
            return currentUser.access_token;
        }

        return '';
    }

    iauthorised():boolean{
        if (localStorage.getItem('currentUser')) {          
            // const helper = new JwtHelperService();
            // const expirationDate = helper.getTokenExpirationDate(localStorage.getItem('appAccess'));

            // const current_time = new Date();
            // if (current_time > expirationDate) {  
            //     return false;
            //   }
            return true;
        }
        return false;
    }




    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}