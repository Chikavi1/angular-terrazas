import { Routes } from '@angular/router';
import { LandingClientComponent } from './landing-client/landing-client.component';
import { LandingBusinessComponent } from './landing-business/landing-business.component';
import { LoginComponent } from './login/login.component';
import { ShowComponent } from './show/show.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MapaComponent } from './mapa/mapa.component';
import { TermsComponent } from './terms/terms.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { ServicesComponent } from './services/services.component';
import { CalendarComponent } from './auth/calendar/calendar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'landing-client', component: LandingClientComponent },
  { path: 'landing-business', component: LandingBusinessComponent },
  { path: 'login', component: LoginComponent },
  { path: 't/:id', component: ShowComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'index', component: IndexComponent },
  { path: 'search', component: MapaComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'services', component: ServicesComponent },

  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/calendar', component: CalendarComponent }



];
