import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { WebRequestService } from '../web-request.service';
import { AlertComponent } from '../alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;

  constructor(private router: Router, private authService:AuthServiceService, private fb:FormBuilder) {

  }

  ngOnInit(): void {

  }


  loginForm: FormGroup = this.fb.group(
    {
      email: new FormControl('',[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    }
  )



  onLogin(){
    if(!this.loginForm.valid) {
      return;
    }
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    console.log(email, password);
    this.authService.loginUser({email,password}).subscribe(
      (response:any)=>{
      console.log(response.status);
      console.log(response.message);
      // this.router.navigate(['/dashboard']);
      if(response.status===true){
        this.authService.toggleClr(true);
        this.authService.toggleHide(true);
      }



      // if(response.Reason=="Login Successful"){
      //   this.alertComponent.toggleClr(true);
      //   this.alertComponent.toggleHide(false);
      // } else {
      //   this.alertComponent.toggleClr(false);
      //   this.alertComponent.toggleHide(false);
      // }
    },error=>{
      console.error(error.error.message);

    }
    );
  }

    // Subscribe - subtype - green response (valid)
    // dashboard - project component
    // add - edit - delete using component
    // import component ...
    // bulk import component ...

}
