import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { passwordValidator } from '../shared/password.validator';
import { emailValidator } from '../shared/email.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      username: ['', [Validators.required, emailValidator]],
      tempPass: ['', Validators.required],
      confirmPass: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    },{validator : passwordValidator});

  }

  /**
   * Send the user data to be registered
   */
  onSubmit() {
    
    this.apiService.registerUser(this.addForm.value)
      .subscribe( data => {
        alert("User Registered");
        this.router.navigate(['login']);
      },
      error=> alert("Cannot Register"));
  }

  /**
   * navigate to login page
   */
  login() {
    this.router.navigate(['login']);
  }

  get username(){
    return this.addForm.get('username');
  }


}
