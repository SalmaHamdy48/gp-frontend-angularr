import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { ProfileComponent } from './features/auth/pages/profile/profile.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RecommendationComponent } from './pages/recommendation/recommendation.component';

import { HomeComponent } from './home/home.component';
import { VirtualTryOnComponent } from './pages/virtual-try-on/virtual-try-on.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  {path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recommendation', component: RecommendationComponent },
  { path: 'vto', component: VirtualTryOnComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}