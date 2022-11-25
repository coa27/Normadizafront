import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { TablerosService } from '../../services/tableros.service';
import * as tablerosActions from '../actions';

@Injectable()
export class TablerosEffects {
    constructor(
        private actions$: Actions,
        private tableroService: TablerosService
    ) {}

    obtenerTableros$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tablerosActions.obtenerTableros),
            mergeMap((data) =>
                this.tableroService.obtenerTablero(data.page, data.size).pipe(
                    map((paginacion) =>
                        tablerosActions.obtenerTablerosExitoso({
                            paginacion,
                        })
                    )
                )
            )
        )
    );

    eliminarTablero$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tablerosActions.eliminarTablero),
            mergeMap((data) => {
                const id: number = data.id;

                return this.tableroService
                    .eliminarTablero(data.id)
                    .pipe(
                        map(() =>
                            tablerosActions.eliminarTablerosExitoso({ id })
                        )
                    );
            })
        )
    );

    agregarTablero$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tablerosActions.agregarTablero),
            mergeMap((data) =>
                this.tableroService
                    .agregarTablero({ nombre: data.nombre })
                    .pipe(
                        map((tablero) =>
                            tablerosActions.agregarTableroExitoso({ tablero })
                        )
                    )
            )
        )
    );

    editarTablero$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tablerosActions.editarTablero),
            mergeMap((data) =>
                this.tableroService
                    .editarTablero({ idTablero: data.id, nombre: data.nombre })
                    .pipe(
                        map((tablero) =>
                            tablerosActions.editarTableroExitoso({ tablero })
                        )
                    )
            )
        )
    );
}
