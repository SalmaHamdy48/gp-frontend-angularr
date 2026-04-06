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
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // for *ngIf etc.

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupData = {
    name: '',
    email: '',
    password: '',
  };

  signupForm!: any;
  submitted = false;
  router: any;
  email: string = '';
  password: string = ''
  name: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
     this. signupForm = this.fb.group({
      email : ['',  [Validators.required]],
      password : ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)]],
      name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
   
  }
  get f() {
    return this.signupForm.controls;
  }

   onSubmit() {
      //const {name, email, password } = this.signupForm.value;
      this.authService.register({ email: this.email, password: this.password , name: this.name}).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          console.log('Registration successful');
        },
        error: (err: any) => {
          console.error('Registration error:', err);
        }
      });
  }

  
 

  /*onSubmit() {
    if (
      this.signupData.name &&
      this.signupData.email &&
      this.signupData.password
    ) {
      // You could also add more validation or an actual HTTP request here.
      console.log('Signup successful', this.signupData);

      // Redirect to the log-in page
      this.router.navigate(['/lognin']);
    } else {
      alert('Please fill all fields');
    }
  }*/
}