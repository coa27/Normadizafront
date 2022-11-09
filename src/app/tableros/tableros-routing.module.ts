import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { TableroComponent } from './pages/tablero/tablero.component';
import { TablerosComponent } from './pages/tableros/tableros.component';

const routes: Routes = [
    {path:'', component: TablerosComponent},
    {path:'tablero/:id', component: TableroComponent},
    {path:'cuenta', component: CuentaComponent},
    {path:'**', redirectTo:'', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablerosRoutingModule { }
