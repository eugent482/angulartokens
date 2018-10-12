import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignUpComponent } from './Components/Authorization/sign-up/sign-up.component';
import { SignInComponent } from './Components/Authorization/sign-in/sign-in.component';
import { HeaderComponent } from './Components/Layout/header/header.component';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { MaterialModule } from './Modules/material/material.module';
import { AuthorizationService } from './Services/authorization.service';
import { HomeComponent } from './Components/home/home.component';

import { AuthGuard } from './Services/auth.guard';
import { AlertService } from './Services/alert.service';
import { JwtInterceptor,  } from './Services/jwt-interceptor.service';
import { ErrorInterceptor,  } from './Services/error-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import {Routes, RouterModule} from '@angular/router';
import { SecretComponent } from './Components/secret/secret.component';
import { AlertComponent } from './Components/alert/alert.component';
const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'login', component: SignInComponent},
  { path:'secret', component: SecretComponent, canActivate: [AuthGuard]}
];



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SecretComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [AuthorizationService, AuthGuard,  AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
  bootstrap: [AppComponent],
  entryComponents: [SignUpComponent]
})
export class AppModule { }
