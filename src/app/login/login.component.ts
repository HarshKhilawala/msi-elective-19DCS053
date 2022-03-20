import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;
  
  constructor(private fb: FormBuilder) {

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
    
    console.log(this.loginForm.value);
  }

}
