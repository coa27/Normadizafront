import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tablero } from '../../interfaces/tablero';
import { AppState } from '../../store/app.reducer';
import * as actions from '../../store/actions';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Tarea } from '../../interfaces/tarea';


@Component({
    selector: 'app-tablero',
    templateUrl: './tablero.component.html',
    styleUrls: ['./tablero.component.scss'],
})
export class TableroComponent {

    tablero!: Tablero[];

    estado: boolean = false;
    titulo: string = '';

    tareas!: Tarea[];
    page!: number;
    size!: number;
    totalElements!: number;

    items!: MenuItem[];
    tareaEditar: Tarea | undefined = undefined;

    constructor(private store: Store<AppState>,
        private router: ActivatedRoute) {

            this.store.select('tableros').subscribe( ({tableros}) => {
                this.tablero = tableros
            })

            this.store.select('tareas').subscribe( data => {
                this.tareas = data.tareas;
                this.page = data.pagina;
                this.size = data.tamanio;
                this.totalElements = data.elementosTotales;
            })

            this.store.dispatch(actions.obtenerTablero({ id: this.router.snapshot.params['id']}))
            this.store.dispatch(actions.obtenerTareas({ id: this.router.snapshot.params['id'], page: 0, size: 10}))

            this.items = [
                {label: 'Finalizado', icon: "pi pi-check", command: (event) => {this.completado()}},
                {label: 'Editar', icon: "pi pi-cog", command: (event) => {this.editar()} }
            ]
    }

    completado(){
        this.store.dispatch(actions.completarTarea( {tarea: this.tareaEditar!} ))
    }

    editar() {
        this.titulo = 'Editar Tarea';
        this.estado = true;
    }

}
