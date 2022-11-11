import { Usuario } from "./usuario.interface";

export interface JWToken{
    usuario: Usuario;
    token: string;
}
