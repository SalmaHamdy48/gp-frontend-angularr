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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  signupForm: any;

  constructor(private router: Router) {}

  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    // Later → connect to backend
    // If success:
    this.router.navigate(['/profile']);
  }
}
