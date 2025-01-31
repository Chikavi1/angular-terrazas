import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';  // Importa las rutas desde el archivo app.routes.ts

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],  // Usa RouterModule con las rutas definidas
  exports: [RouterModule]
})
export class AppRoutingModule { }
