import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'nosotros', component: InformacionComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InicioRoutingModule {}
