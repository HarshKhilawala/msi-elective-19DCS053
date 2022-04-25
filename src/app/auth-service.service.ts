import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';
import { AlertComponent } from './alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private webRequestService:WebRequestService, private alertComponent:AlertComponent) {

  }

  toggleClr(clr:boolean){
    this.alertComponent.toggleClr(clr);
  }

  toggleHide(hide:boolean){
    this.alertComponent.toggleHide(hide);
  }

  loginUser(credentials:Object){
    return this.webRequestService.post('login',credentials);
  }

  registerUser(credentials:Object){
    return this.webRequestService.post('register',credentials);
  }

}
