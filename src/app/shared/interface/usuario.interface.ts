export interface UsuarioRegistro{

    nombre: string;
    email: string;
    contrasenia: string;

}

export interface Usuario{
    idUsuario: number;
    nombre: string;
    email: string;
    createAt: Date;
    updatedAt: Date;
}

export interface UsuarioLogin{
    emailOrUsuario: string;
    password: string;
}
