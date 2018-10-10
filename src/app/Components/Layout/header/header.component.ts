import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../Services/authorization.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthorizationService) { }


  ngOnInit() {
  }

}
