import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import {  FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  get form() { return this.registerForm.controls; }
  registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  constructor(public authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  @Output()
  get errorMsg() {
    return this.authService.errorMessage;
  }

  onSubmit(): void {

    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.form.username.value, this.form.password.value);
  }

  ngOnDestroy(): void{
    this.authService.errorMessage = "";
  }
}
