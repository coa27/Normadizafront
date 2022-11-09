import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InformacionComponent } from './pages/informacion/informacion.component';

import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [
    InicioComponent,
    InformacionComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    ButtonModule
  ]
})
export class InicioModule { }
