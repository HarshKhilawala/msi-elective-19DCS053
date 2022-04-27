import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  fullName:string = "";
  email:string = "";
  role:string = "";

  menuItems = ['dashboard', 'register', 'table'];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    //Public authService - usecase in nav.component.html
  constructor(public authService:AuthServiceService,private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.authService.getUserDetails().subscribe((response:any)=>{
      this.fullName = response.name;
      this.email = response.email;
      this.role = response.role;
    },error=>{
      console.log(error.error.message);
    });
  }



  ///! Pending ! => Verification of Token
}
