import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Asegúrate de tener el componente principal
import { AppRoutingModule } from './app-routing.module'; // Importa el módulo de rutas
import { LandingClientComponent } from './landing-client/landing-client.component'; // Tu componente de cliente
import { LandingBusinessComponent } from './landing-business/landing-business.component'; // Tu componente de negocio
import { LoginComponent } from './login/login.component'; // Tu componente de login
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,                // Componente raíz
    LandingClientComponent,      // Componente de landing para clientes
    LandingBusinessComponent,    // Componente de landing para negocios
    LoginComponent               // Componente de login
  ],
  imports: [
    HttpClientModule,
    BrowserModule,               // Importa el módulo de navegador
    AppRoutingModule             // Importa el módulo de rutas que contiene las rutas definidas
  ],
  providers: [],
  bootstrap: [AppComponent]       // Componente raíz que se carga primero
})
export class AppModule { }
