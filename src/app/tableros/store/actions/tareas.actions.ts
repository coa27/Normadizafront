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

//actualizar tarea
export const actualizarTarea = createAction(
    '[Tareas] Actualizar Tarea',
    props<{ tarea: Tarea }>()
);

export const actualizarTareaExitoso = createAction(
    '[Tareas] Actualizar Tarea Exitoso',
    props<{ tarea: Tarea }>()
);
export const actualizarTareaError = createAction(
    '[Tareas] Actualizar Tarea Error',
    props<{ error: any }>()
);


//agregar tarea
export const agregarTarea = createAction(
    '[Tareas] Agregar Tarea',
    props<{ tarea: Tarea }>()
);

export const agregarTareaExitoso = createAction(
    '[Tareas] Agregar Tarea Exitoso',
    props<{ tarea: Tarea }>()
);
export const agregarTareaError = createAction(
    '[Tareas] Agregar Tarea Error',
    props<{ error: any }>()
);

//eliminar tarea
export const eliminarTarea = createAction(
    '[Tareas] Eliminar Tarea',
    props<{ id: number }>()
);

export const eliminarTareaExitoso = createAction(
    '[Tareas] Eliminar Tarea Exitoso',
    props<{ id: number }>()
);
export const eliminarTareaError = createAction(
    '[Tareas] Eliminar Tarea Error',
    props<{ error: any }>()
);
