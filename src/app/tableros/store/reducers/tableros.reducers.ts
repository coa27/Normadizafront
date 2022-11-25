import { createReducer, on } from '@ngrx/store';
import { Tablero } from '../../interfaces/tablero';
import * as actions from '../actions';

export interface TablerosState {
    tableros: Tablero[];
    pagina: number;
    tamanio: number;
    elementosTotales: number;
    cargado: boolean;
    cargando: boolean;
    error: any;
}

export const tablerosInitialState: TablerosState = {
    tableros: [],
    pagina: 0,
    tamanio: 0,
    elementosTotales: 0,
    cargado: false,
    cargando: false,
    error: null,
};

export const _tableroReducer = createReducer(
    tablerosInitialState,
    on(actions.obtenerTableros, (state, { page, size }) => ({
        ...state,
        cargando: true,
    })),

    on(actions.obtenerTablerosExitoso, (state, { paginacion }) => ({
        ...state,
        cargado: true,
        cargando: false,
        tableros: paginacion.content,
        pagina: paginacion.pageable.pageNumber,
        tamanio: paginacion.pageable.pageSize,
        elementosTotales: paginacion.totalElements,
    })),
    on(actions.obtenerTablerosError, (state, { error }) => ({
        ...state,
        cargado: true,
        cargando: false,
        error,
    })),

    //ELIMINAR
    on(actions.eliminarTablero, (state, { id }) => ({
        ...state,
        cargando: true,
    })),

    on(actions.eliminarTablerosExitoso, (state, { id }) => {
        const tableros: Tablero[] = state.tableros.filter(
            (t) => t.idTablero !== id
        );

        return {
            ...state,
            cargado: true,
            cargando: false,
            tableros,
        };
    }),
    on(actions.eliminarTablerosError, (state, { error }) => ({
        ...state,
        cargado: true,
        cargando: false,
        error,
    })),

    //AGREGAR
    on(actions.agregarTablero, (state, { nombre }) => ({
        ...state,
        cargando: true,
    })),

    on(actions.agregarTableroExitoso, (state, { tablero }) => ({
        ...state,
        cargado: true,
        cargando: false,
        tableros: [...state.tableros, tablero],
    })),

    on(actions.agregarTablerosError, (state, { error }) => ({
        ...state,
        cargado: true,
        cargando: false,
        error,
    })),

    //EDITAR
    on(actions.editarTablero, (state, { id, nombre }) => ({
        ...state,
        cargando: true,
    })),

    on(actions.editarTableroExitoso, (state, { tablero }) => {
        const tableros: Tablero[] = state.tableros.filter(t => t.idTablero !== tablero.idTablero)
        tableros.push(tablero)
        const t: Tablero[] = tableros.sort((t1, t2) => {
            if(t1.idTablero > t2.idTablero){
                return 1;
            }
            if(t1.idTablero < t2.idTablero){
                return -1;
            }

            return 0;
        })

        return {
            ...state,
            cargado: true,
            cargando: false,
            tableros: t
        };
    }),

    on(actions.editarTablerosError, (state, { error }) => ({
        ...state,
        cargado: true,
        cargando: false,
        error,
    }))
);

export function tableroReducer(state: any, action: any) {
    return _tableroReducer(state, action);
}
