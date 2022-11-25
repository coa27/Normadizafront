export interface Tablero {
    idTablero: number;
    nombre: string;
    createAt: string;
    updatedAt: string;
    idUsuario: number;
    cantidadTotalTareas: number;
    cantidadTotalTareasCompletas: number;
}

export interface TableroObject {
    tablero?: ActualizarTablero;
    nombre?: string;
}

export interface RegistrarTablero{
    nombre: string;
}

export interface ActualizarTablero{
    idTablero: number;
    nombre: string;
}
