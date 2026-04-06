// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';    

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  signupForm: any;
  loginForm: any;

  constructor(private router: Router, private authService: AuthService, private _formBuilder:FormBuilder , private _auth:AuthService, private _router:Router,) {
    this.loginForm = _formBuilder.group({
      email : ['',  [Validators.required]],
      password : ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/)]]
    })
  }


   /*LoginUser(){
    if(this.loginForm.valid){
      this._auth.login(this.loginForm.value).subscribe({
        next:(data:any)=>{ this.router.navigate(['/home']); console.log('Login successful'); },
        error:(error:any)=>{ 
          if (error.error.message == 'Email is not confirmed') {
            const value = 'activateAccount';
            return
          }
         }
        });
      }   
  }*/

  

  onSubmit() {
  this.authService.login({ email: this.email, password: this.password }).subscribe({
    next: () => {
      this.router.navigate(['/home']);
      console.log('Login successful');
    },
    error: (err: any) => {
      console.error('Login error:', err);
    }
  });
}


  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Later → connect to backend
    // If success:
    this.router.navigate(['/profile']);
  }
}
