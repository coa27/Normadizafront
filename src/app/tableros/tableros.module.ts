import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablerosRoutingModule } from './tableros-routing.module';
import { TableroComponent } from './pages/tablero/tablero.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { TablerosComponent } from './pages/tableros/tableros.component';


@NgModule({
  declarations: [
    TableroComponent,
    CuentaComponent,
    TablerosComponent
  ],
  imports: [
    CommonModule,
    TablerosRoutingModule
  ]
})
export class TablerosModule { }
