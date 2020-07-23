import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../service/api.service";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    //send login data
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    // if successful navigate to list-user page
    this.apiService.login(loginPayload).subscribe(data => {
      if (data.status === 200) {
        window.localStorage.setItem('token', data.result.token);
        this.router.navigate(['list-user']);
      } else {
        this.invalidLogin = true;
        alert(data.message);
      }
    },
      error => alert("Cannot Login"));
  }

  ngOnInit() {
    // remove token from local storage 
    window.localStorage.removeItem('token');

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  registration() {
    this.router.navigate(['registration']);
  }

  newsPage() {
    this.router.navigate(['news-page']);
  }

}
