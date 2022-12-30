import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tablero } from '../../interfaces/tablero';
import { AppState } from '../../store/app.reducer';
import * as actions from '../../store/actions';
import { ActivatedRoute } from '@angular/router';
import {
    ConfirmationService,
    MenuItem,
    Message,
    MessageService,
} from 'primeng/api';
import { Tarea } from '../../interfaces/tarea';
import { DialogComunnication } from '../../interfaces/dialog';

@Component({
    selector: 'app-tablero',
    templateUrl: './tablero.component.html',
    styleUrls: ['./tablero.component.scss'],
    providers: [ConfirmationService, MessageService],
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

    mensajes: Message[] = [];

    constructor(
        private store: Store<AppState>,
        private router: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        this.store.select('tableros').subscribe(({ tableros }) => {
            this.tablero = tableros;
        });

        this.store.select('tareas').subscribe((data) => {
            this.tareas = data.tareas;
            this.page = data.pagina;
            this.size = data.tamanio;
            this.totalElements = data.elementosTotales;
        });

        this.store.dispatch(
            actions.obtenerTablero({ id: this.router.snapshot.params['id'] })
        );
        this.store.dispatch(
            actions.obtenerTareas({
                id: this.router.snapshot.params['id'],
                page: 0,
                size: 10,
            })
        );

        this.items = [
            {
                label: 'Finalizado',
                icon: 'pi pi-check',
                command: (event) => {
                    this.completado();
                },
            },
            {
                label: 'Editar',
                icon: 'pi pi-cog',
                command: (event) => {
                    this.editar();
                },
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-trash',
                command: (event) => {
                    this.confirmar(this.tareaEditar!);
                    this.tareaEditar = undefined;
                },
            },
        ];
    }

    completado() {
        this.store.dispatch(
            actions.completarTarea({ tarea: this.tareaEditar! })
        );
    }

    editar() {
        this.titulo = 'Editar Tarea';
        this.estado = true;
    }

    action(a: DialogComunnication) {
        if (a.estado) {
            const fechaInicio: string =
                a.fecha![0].getDate() +
                '/' +
                (a.fecha![0].getMonth() + 1) +
                '/' +
                a.fecha![0].getFullYear();

            let fechaFin: string | null = null;
            if (a.fecha?.length === 2 && a.fecha[1] !== null) {
                fechaFin =
                    a.fecha[1].getDate() +
                    '/' +
                    (a.fecha[1].getMonth() + 1) +
                    '/' +
                    a.fecha[1].getFullYear();
            }

            if (this.tareaEditar?.id) {
                this.store.dispatch(
                    actions.actualizarTarea({
                        tarea: {
                            id: this.tareaEditar!.id,
                            nombre: a.nombre!,
                            descripcion: a.descripcion!,
                            fechaInicio: fechaInicio,
                            fechaFin: fechaFin,
                            finalizado: this.tareaEditar!.finalizado,
                            idTablero: this.tareaEditar!.idTablero,
                        },
                    })
                );
            } else {
                this.store.dispatch(
                    actions.agregarTarea({
                        tarea: {
                            nombre: a.nombre!,
                            descripcion: a.descripcion!,
                            fechaInicio: fechaInicio,
                            fechaFin: fechaFin,
                            finalizado: false,
                            idTablero: this.tablero[0].idTablero,
                        },
                    })
                );
            }
        }

        this.estado = false;
        this.tareaEditar = undefined;
    }

    confirmar(tarea: Tarea) {
        this.confirmationService.confirm({
            message: '¿Quieres eliminar la tarea: ' + tarea.nombre + '?',
            header: 'Eliminar Tarea',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.eliminarTarea(tarea);
                this.messageService.add({
                    closable: false,
                    severity: 'success',
                    summary: 'Eliminado',
                    detail: 'Tarea Eliminada Correctamente',
                });
            },
        });
    }

    eliminarTarea(tarea: Tarea) {
        this.store.dispatch(actions.eliminarTarea({ id: tarea.id! }));
        this.tareaEditar = undefined;
    }

    agregarTarea() {
        this.estado = true;
        this.titulo = 'Editar Tarea';

        this.tareaEditar = {
            nombre: '',
            descripcion: '',
            fechaInicio: null,
            fechaFin: null,
            finalizado: false,
            idTablero: this.tablero[0].idTablero,
        };
    }
}
