import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  get form() { return this.loginForm.controls; }
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public authService: AuthService, private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
  }
  
  @Output()
  get errorMsg() {
    return this.authService.errorMessage;
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.form.username.value, this.form.password.value);
  }
  ngOnDestroy(): void{
    this.authService.errorMessage = "";
  }
}
