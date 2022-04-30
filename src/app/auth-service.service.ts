import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router:Router, private webRequestService:WebRequestService) {

  }

  getProjectTable(){
    return this.webRequestService.get('table');
  }

  addSingleProject(projectDetails:Object){
    return this.webRequestService.post('singleproject', projectDetails);
  }

  updateSingleProject(projectDetails:Object){
    return this.webRequestService.put('singleproject', projectDetails);
  }

  deleteSingleProject(projectDetails:Object){
    return this.webRequestService.deleteOne('deletesingleproject', projectDetails);
  }

  deleteMultipleProjects(projectDetails:Object){
    return this.webRequestService.deleteMultiple('deletemultipleprojects', projectDetails);
  }

  getUserDetails(){
    return this.webRequestService.get('nav');
  }

  loginUser(credentials:Object){
    return this.webRequestService.post('login',credentials);
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  registerUser(credentials:Object){
    return this.webRequestService.post('register',credentials);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
