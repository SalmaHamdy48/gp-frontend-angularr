// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss']
// })
// export class SignupComponent {

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common'; // for *ngIf etc.



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
// export class SignupComponent {
// onSignUp() {
// throw new Error('Method not implemented.');
// }
// onLogIn: any;

//   Name: string = '';
//   Email: string = '';
//   Password: string = '';
// signupObj: any;
// loginObj: any;

//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   onSubmit() {
//     this.authService.signup(this.Name, this.Email, this.Password);
//     console.log('Signup submitted');
//   }

//   goToLogin() {
//     this.router.navigate(['/auth/login']);
//   }
// }



export class SignupComponent implements OnInit {
signupData = {
    name: '',
    email: '',
    password: ''
  };
// onSignUp() {
// throw new Error('Method not implemented.');
// }
// onLogIn() {
// throw new Error('Method not implemented.');
// }
  signupForm!: FormGroup;
  submitted = false;
  router: any;

  // constructor(private formBuilder: FormBuilder) {}

  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  
  onSubmit() {
    // console.log('Form submitted:', this.signupData);
    // Here you would call your authentication service


     if (this.signupData.name && this.signupData.email && this.signupData.password) {
      // You could also add more validation or an actual HTTP request here.
      console.log('Signup successful', this.signupData);

      // Redirect to the log-in page
      this.router.navigate(['/lognin']);
    } else {
      alert('Please fill all fields');
    }
  }
}

