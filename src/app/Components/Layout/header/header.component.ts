import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../Services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  profile:string;
  ngOnInit() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('currentUser'));
    //if(decodedToken)
     // this.profile=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid"];
  }

}
