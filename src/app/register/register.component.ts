import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { WebRequestService } from '../web-request.service';
import { Router } from '@angular/router';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  hide: boolean = false;
  btnColor: boolean = true;
  hideAlert: boolean = true;

  roles:Role[] = [
    {value: 'Admin', viewValue:'Admin'},
    {value: 'Viewer', viewValue: 'Viewer'},
  ];



  constructor(private router: Router, private authService:AuthServiceService, private fb:FormBuilder) {

  }

  ngOnInit(): void {

  }

  registerForm: FormGroup = this.fb.group(
    {
      name: new FormControl('',[Validators.required, Validators.minLength(5)]),
      email: new FormControl('',[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      userRole: new FormControl('',Validators.required),
    }
  )



  onRegister(){
    if(!this.registerForm.valid) {
      return;
    }
    let name = this.registerForm.value.name;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    let role = this.registerForm.value.userRole;
    console.log({name, email, password, role});

    this.authService.registerUser({name, email, password, role}).subscribe((response:any)=>{
      console.log(response);
      localStorage.setItem('token', response.token);
      this.btnColor = true;
      // this.router.navigate(['/nav']);
    }, error=>{
      console.log(error.error.message);
      this.btnColor = false;
    });

    this.hideAlert = false;
  }


  toggleAlert(){
    this.hideAlert = !this.hideAlert;
  }

}
