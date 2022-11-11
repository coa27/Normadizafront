import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { JWToken } from 'src/app/shared/interface/jwt.interface';
import { Usuario, UsuarioLogin, UsuarioRegistro } from 'src/app/shared/interface/usuario.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private url: string = environment.HOST;

    constructor(private http: HttpClient) {}

    registrarUsuario(usuario: UsuarioRegistro): Observable<Usuario>{
        return this.http.post<Usuario>(`${this.url}/auth/registro`, usuario).pipe(
            tap( u => this.iniciarSesion({emailOrUsuario: u.nombre, password: usuario.contrasenia}).subscribe( data =>
                sessionStorage.setItem("token", data.token)
            ))
        );
    }

    iniciarSesion(usuario: UsuarioLogin): Observable<JWToken>{
        return this.http.post<JWToken>(`${this.url}/auth/acceder`, usuario);
    }
}
