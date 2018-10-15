import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { ICurrentUser } from '../Components/CurrentUser'
import { configUrl } from '../config';

@Injectable()
export class  AuthenticationService {
    constructor(private http: HttpClient, private router: Router) { }
    url = configUrl;
    //get an access token
    login(username: string, password: string):Observable<ICurrentUser> {
        return this.http.post<ICurrentUser>(this.url+`signin`, { username: username, password: password })
            .pipe(map(user => {
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    //refresh access token 
    refreshToken() : Observable<ICurrentUser> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.refresh_token;
      
     
        return this.http.post<ICurrentUser>(this.url+"refresh", { refresh: token })
          .pipe(
            map(user => {     
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }     
              return <ICurrentUser>user;
          }));
    }

    //get a token of logged user
    getAuthToken() : string {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser != null) {
            return currentUser.access_token;
        }
        return '';
    }

    //check if user is logged
    isauthorised():boolean{
        if (localStorage.getItem('currentUser')) {
            return true;
        }
        return false;
    }

    // remove user from local storage to log user out
    logout() {
        localStorage.removeItem('currentUser');
    }
}