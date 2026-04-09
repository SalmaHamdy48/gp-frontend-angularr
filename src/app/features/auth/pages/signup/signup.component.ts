
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupData = {
    username: '',
    email: '',
    password: '',
  };

  signupForm!: any;
  submitted = false;
  router: any;
  email: string = '';
  password: string = ''
  username: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
     this. signupForm = this.fb.group({
      email : ['',  [Validators.required]],
      password : ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)]],
      username: ['', Validators.required]
    })
  }

  ngOnInit(): void {
   
  }
  get f() {
    return this.signupForm.controls;
  }

   onSubmit() {
      this.authService.register({ email: this.email, password: this.password , username: this.username}).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          console.log('Registration successful');
        },
        error: (err: any) => {
          console.error('Registration error:', err);
        }
      });
  }
}