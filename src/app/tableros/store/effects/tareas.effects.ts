import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { TareasService } from '../../services/tareas.service';
import * as tareasActions from '../actions';

@Injectable()
export class TareasEffects {
    constructor(
        private actions$: Actions,
        private tareasService: TareasService
    ) {}

    obtenerTareas$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tareasActions.obtenerTareas),
            mergeMap((data) =>
                this.tareasService
                    .obtenerTareas(data.id, data.page, data.size)
                    .pipe(
                        map((paginacion) =>
                            tareasActions.obtenerTareasExitoso({
                                paginacion
                            })
                        )
                    )
            )
        )
    );

    completarTarea$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tareasActions.completarTarea),
            mergeMap((data) =>
                this.tareasService
                    .completarTarea( data.tarea )
                    .pipe(
                        map(tarea =>
                            tareasActions.completarTareaExitoso( { tarea })
                        )
                    )
            )
        )
    );

    actualizarTarea$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tareasActions.actualizarTarea),
            mergeMap((data) =>
                this.tareasService
                    .actualizarTarea( data.tarea )
                    .pipe(
                        map(tarea =>
                            tareasActions.actualizarTareaExitoso({ tarea })
                        )
                    )
            )
        )
    );

    agregarTarea$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tareasActions.agregarTarea),
            mergeMap((data) =>
                this.tareasService
                    .agregarTarea(data.tarea)
                    .pipe(
                        map(tarea =>
                            tareasActions.agregarTareaExitoso({ tarea })
                        )
                    )
            )
        )
    );

    eliminarTarea$ = createEffect(() =>
        this.actions$.pipe(
            ofType(tareasActions.eliminarTarea),
            mergeMap((data) =>
                this.tareasService
                    .eliminarTarea(data.id)
                    .pipe(
                        map(id =>
                            tareasActions.eliminarTareaExitoso({ id })
                        )
                    )
            )
        )
    );
}
