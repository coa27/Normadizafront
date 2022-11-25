import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablerosRoutingModule } from './tableros-routing.module';
import { TableroComponent } from './pages/tablero/tablero.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { TablerosComponent } from './pages/tableros/tableros.component';
import { NgprimeModule } from '../shared/ngprime/ngprime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
  declarations: [
    TableroComponent,
    CuentaComponent,
    TablerosComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    TablerosRoutingModule,
    NgprimeModule,
    ReactiveFormsModule
  ]
})
export class TablerosModule { }
