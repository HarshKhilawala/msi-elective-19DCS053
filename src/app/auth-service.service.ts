import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private webRequestService:WebRequestService) {

  }


  loginUser(credentials:Object){
    return this.webRequestService.post('login',credentials);
  }

  registerUser(credentials:Object){
    return this.webRequestService.post('register',credentials);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

}
