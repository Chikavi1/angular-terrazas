import { Routes } from '@angular/router';
import { LandingClientComponent } from './landing-client/landing-client.component';
import { LandingBusinessComponent } from './landing-business/landing-business.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing-client', pathMatch: 'full' },
  { path: 'landing-client', component: LandingClientComponent },
  { path: 'landing-business', component: LandingBusinessComponent },
  { path: 'login', component: LoginComponent }
];
