import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { WebRequestService } from '../web-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = false;

  constructor(private authService:AuthServiceService, private fb:FormBuilder) {

  }

  ngOnInit(): void {

  }

  registerForm: FormGroup = this.fb.group(
    {
      email: new FormControl('',[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    }
  )



  onRegister(){
    if(!this.registerForm.valid) {
      return;
    }
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    console.log(email, password);
    this.authService.registerUser({email,password}).subscribe((response:any)=>{
      console.log(response);
    });
  }

}
