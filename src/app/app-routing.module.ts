// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { ProfileComponent } from './features/auth/pages/profile/profile.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RecommendationComponent } from './features/auth/pages/recommendation/recommendation.component';

const routes: Routes = [
  // path: 'signup',
  // loadChildren: () =>
  //   import('./features/auth/auth.module')
  //     .then(m => m.AuthModule)

  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  {path:'recommendation',component:RecommendationComponent}
  // { path: 'signin', component: SigninComponent },

  // export const routes: Routes = [
  //   { path: 'signup', component: SignupComponent },
  //   { path: '', redirectTo: '/signup', pathMatch: 'full' }
  //
import { HomeComponent } from './home/home.component';
import { VirtualTryOnComponent } from './pages/virtual-try-on/virtual-try-on.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vto', component: VirtualTryOnComponent }
  // { path: 'recommendations', component: RecommendationsComponent },
  // { path: 'profile', component: ProfileComponent },
  //{ path: '', redirectTo: 'vto', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
