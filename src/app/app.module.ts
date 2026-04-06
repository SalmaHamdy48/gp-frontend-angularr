// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { SignupComponent } from './features/auth/pages/signup/signup.component';// import { FeaturesAuthModule } from './features-auth/features-auth.module';
import { AuthModule } from './features/auth/auth.module';
import { ProfileComponent } from "./features/auth/pages/profile/profile.component";
import { LoginComponent } from './features/auth/pages/login/login.component';
import { HomeComponent } from './home/home.component';
import { VirtualTryOnComponent } from './pages/virtual-try-on/virtual-try-on.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // SignupComponent
    HomeComponent,
    VirtualTryOnComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    HttpClientModule

    // LoginComponent,
    // SignupComponent
    // ProfileComponent,
    // Recommendation1Component
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}




