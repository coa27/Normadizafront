import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/shared/interface/usuario.interface';
import { DialogComunnication } from '../../interfaces/dialog';
import { Tablero } from '../../interfaces/tablero';
import { TablerosService } from '../../services/tableros.service';
import * as actionsTablero from '../../store/actions';
import { AppState } from '../../store/app.reducer';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
    selector: 'app-tableros',
    templateUrl: './tableros.component.html',
    styleUrls: ['./tableros.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class TablerosComponent {
    usuario!: Usuario;
    tableros!: Tablero[];
    page!: number;
    size!: number;
    elementosTotales!: number;

    tableroToEdit: Tablero | undefined = undefined;
    dialog: boolean = false;
    nombre!: string;
    tituloDialog!: string;
    mensajes: Message[] = [];

    constructor(
        private tableroService: TablerosService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private store: Store<AppState>
    ) {
        this.tableroService
            .obtenerUsuario()
            .subscribe((data) => (this.usuario = data));

        this.store
            .select('tableros')
            .subscribe(({ tableros, pagina, tamanio, elementosTotales }) => {
                this.page = pagina!;
                this.size = tamanio!;
                this.elementosTotales = elementosTotales;
                this.tableros = tableros!;
            });

        this.store.dispatch(
            actionsTablero.obtenerTableros({ page: 0, size: 5 })
        );
    }

    confirmar(tablero: Tablero) {
        this.confirmationService.confirm({
            message: "¿Quieres eliminar el tablero: " + tablero.nombre + "?",
            header: "Eliminar Tablero",
            icon: "pi pi-info-circle",
            accept: () => {
                this.eliminarTablero(tablero)
                this.messageService.add({closable: false, severity: "success", summary: "Eliminado", detail:"Tablero Eliminado Correctamente"})
            },
        });
    }

    eliminarTablero(tablero: Tablero) {
        this.store.dispatch(
            actionsTablero.eliminarTablero({ id: tablero.idTablero })
        );
    }

    agregarTablero() {
        if (this.tableroToEdit === undefined) {
            this.nombre = 'Nombre del tablero';
            this.tituloDialog = 'Crear tablero';
        } else {
            this.nombre = this.tableroToEdit.nombre;
            this.tituloDialog = 'Editar tablero';
        }
        this.dialog = true;
    }

    accion(estado: DialogComunnication) {
        if (estado.estado && this.tableroToEdit === undefined) {
            this.store.dispatch(
                actionsTablero.agregarTablero({ nombre: estado.nombre! })
            );
        } else if (estado.estado && this.tableroToEdit !== undefined) {
            this.store.dispatch(
                actionsTablero.editarTablero({
                    id: this.tableroToEdit.idTablero,
                    nombre: estado.nombre!,
                })
            );
        }
        this.tableroToEdit = undefined;
        this.dialog = false;
    }

    paginate(evento: any) {
        (this.page = evento.page), (this.size = evento.rows);
        this.store.dispatch(
            actionsTablero.obtenerTableros({
                page: evento.page,
                size: evento.rows,
            })
        );
    }
}
