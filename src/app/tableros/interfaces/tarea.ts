import { Tablero } from "./tablero";

export interface TareasTotales {
    total: number;
    completas: number;
}

export interface Tarea {
    id?: number;
    nombre: string;
    descripcion: string;
    finalizado: boolean;
    fechaInicio: string | null;
    fechaFin: string | null;
    idTablero: number;
}

export interface PaginacionTarea {
    tareas: Tarea[];
    page: number;
    size: number;
    elementosTotales: number;
}
