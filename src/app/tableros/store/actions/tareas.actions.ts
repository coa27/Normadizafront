import { createAction, props } from '@ngrx/store';
import { PaginacionTarea, Tarea } from '../../interfaces/tarea';

//obtener
export const obtenerTareas = createAction(
    '[Tareas] Obtener Tareas',
    props<{ id: number, page: number, size: number }>()
);

export const obtenerTareasExitoso = createAction(
    '[Tareas] Obtener Tareas Exitoso',
    props<{ paginacion: PaginacionTarea }>()
);
export const obtenerTareasError = createAction(
    '[Tareas] Obtener Tareas Error',
    props<{ error: any }>()
);

//completar tarea
export const completarTarea = createAction(
    '[Tareas] Completar Tarea',
    props<{ tarea: Tarea }>()
);

export const completarTareaExitoso = createAction(
    '[Tareas] Completar Tarea Exitoso',
    props<{ tarea: Tarea }>()
);
export const completarTareaError = createAction(
    '[Tareas] Completar Tarea Error',
    props<{ error: any }>()
);
