import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  get form() { return this.loginForm.controls; }
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public authService: AuthService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
  }
  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }
    this.authService.SignIn(this.form.username.value, this.form.password.value);
  }
}
