import { createAction, props } from '@ngrx/store';
import { Paginacion } from '../../interfaces/paginacion';
import { Tablero } from '../../interfaces/tablero';

//obtener
export const obtenerTableros = createAction(
    '[Tableros] Obtener Tableros',
    props<{ page: number; size: number }>()
);

export const obtenerTablerosExitoso = createAction(
    '[Tableros] Obtener Tableros Exitoso',
    props<{ paginacion: Paginacion }>()
);
export const obtenerTablerosError = createAction(
    '[Tableros] Obtener Tableros Error',
    props<{ error: any }>()
);

//eliminar
export const eliminarTablero = createAction(
    '[Tableros] eliminar Tablero',
    props<{ id: number }>()
);

export const eliminarTablerosExitoso = createAction(
    '[Tableros] eliminar Tablero Exitoso',
    props<{ id: number }>()
);
export const eliminarTablerosError = createAction(
    '[Tableros] eliminar Tablero Error',
    props<{ error: any }>()
);

//agregar
export const agregarTablero = createAction(
    '[Tableros] Agregar Tablero',
    props<{ nombre: string }>()
);

export const agregarTableroExitoso = createAction(
    '[Tableros] Agregar Tablero Exitoso',
    props<{ tablero: Tablero }>()
);
export const agregarTablerosError = createAction(
    '[Tableros] Agregar Tablero Error',
    props<{ error: any }>()
);

//editar
export const editarTablero = createAction(
    '[Tableros] Editar Tablero',
    props<{ id: number, nombre: string }>()
);

export const editarTableroExitoso = createAction(
    '[Tableros] Editar Tablero Exitoso',
    props<{ tablero: Tablero }>()
);
export const editarTablerosError = createAction(
    '[Tableros] Editar Tablero Error',
    props<{ error: any }>()
);
