import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
