import { createReducer, on } from '@ngrx/store';
import { Tablero } from '../../interfaces/tablero';
import { Tarea } from '../../interfaces/tarea';
import * as actions from '../actions';

export interface TareasState {
    tareas: Tarea[];
    pagina: number;
    tamanio: number;
    elementosTotales: number;
    cargado: boolean;
    cargando: boolean;
    error: any;
}

export const tareasInitialState: TareasState = {
    tareas: [],
    pagina: 0,
    tamanio: 0,
    elementosTotales: 0,
    cargado: false,
    cargando: false,
    error: null,
};

export const _tareaReducer = createReducer(
    tareasInitialState,

    //Obtener
    on(actions.obtenerTareas, (state, { id, page, size }) => ({
        ...state,
        cargando: true,
    })),

    on(actions.obtenerTareasExitoso, (state, { paginacion }) => ({
        ...state,
        cargado: true,
        cargando: false,
        tareas: paginacion.tareas,
        pagina: paginacion.page,
        tamanio: paginacion.size,
        elementosTotales: paginacion.elementosTotales,
    })),
    on(actions.obtenerTareasError, (state, { error }) => ({
        ...state,
        cargado: true,
        cargando: false,
        error,
    })),

    //Completar Tarea
    on(actions.completarTarea, (state, { tarea }) => ({
        ...state,
        cargando: true,
    })),

    on(actions.completarTareaExitoso, (state, { tarea }) => {
        const tareas: Tarea[] = state.tareas.filter((t) => t.id !== tarea.id);
        tareas.push(tarea);
        const t: Tarea[] = tareas.sort((t1, t2) => {
            if (t1.id > t2.id) {
                return 1;
            }
            if (t1.id < t2.id) {
                return -1;
            }
            return 0;
        });

        return {
            ...state,
            cargado: true,
            cargando: false,
            tareas: t,
        };
    }),
    on(actions.completarTareaError, (state, { error }) => ({
        ...state,
        cargado: true,
        cargando: false,
        error,
    }))
);

export function tareaReducer(state: any, action: any) {
    return _tareaReducer(state, action);
}
