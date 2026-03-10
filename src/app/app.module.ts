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

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,

    // LoginComponent,
    // SignupComponent
    // ProfileComponent,
    // Recommendation1Component
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}




