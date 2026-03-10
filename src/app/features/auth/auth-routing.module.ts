// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RecommendationComponent } from './pages/recommendation/recommendation.component';
const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'recommendation', component: RecommendationComponent },
  // { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
