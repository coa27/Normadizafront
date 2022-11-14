import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { JWToken } from 'src/app/shared/interface/jwt.interface';
import { Usuario, UsuarioLogin, UsuarioRegistro } from 'src/app/shared/interface/usuario.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private url: string = environment.HOST;

    constructor(private http: HttpClient, private router: Router) {}

    registrarUsuario(usuario: UsuarioRegistro): Observable<Usuario>{
        return this.http.post<Usuario>(`${this.url}/auth/registro`, usuario).pipe(
            tap( u => this.iniciarSesion({emailOrUsuario: u.nombre, password: usuario.contrasenia}).subscribe())
        );
    }

    iniciarSesion(usuario: UsuarioLogin): Observable<JWToken>{
        return this.http.post<JWToken>(`${this.url}/auth/acceder`, usuario).pipe(
            tap(  data => {
                sessionStorage.setItem("token", data.token)
                this.router.navigateByUrl("/tableros")
            }),
        );
    }

    validarToken(): Observable<boolean>{

        const headers = new HttpHeaders().set('x-token', sessionStorage.getItem('token') || '');

        return this.http.get<void>(`${this.url}/auth/validar`, {headers, observe: 'response' }).pipe(
            map((response) => {
                if (response.status === 200){
                    return true
                }
                return false
            }),
            catchError( () => of(false) )
        )
    }
}
