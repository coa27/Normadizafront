import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import("./inicio/inicio.module").then(m => m.InicioModule)},
  {path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)},
  {path: 'tableros', loadChildren: () => import("./tableros/tableros.module").then(m => m.TablerosModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
