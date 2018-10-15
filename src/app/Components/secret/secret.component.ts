import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from '../../user'
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss']
})
export class SecretComponent implements OnInit {

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }

  users: User[];
  ngOnInit() {
    this.http.get<User[]>("https://localhost:44357/api/Auth/getallprotected").subscribe((data) => this.users=data);
    
  }

}
