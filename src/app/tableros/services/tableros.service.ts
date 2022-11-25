import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Usuario } from 'src/app/shared/interface/usuario.interface';
import { Paginacion } from '../interfaces/paginacion';
import { ActualizarTablero, RegistrarTablero, Tablero } from '../interfaces/tablero';


@Injectable({
  providedIn: 'root'
})
export class TablerosService {

    private url: string = environment.HOST;

    get headers(): HttpHeaders{
        return new HttpHeaders().set("Authorization", "Bearer "+sessionStorage.getItem("token") || '');
    };

    constructor(private http: HttpClient, private router: Router) {}

    obtenerUsuario(): Observable<Usuario>{
        return this.http.get<Usuario>(`${this.url}/usuario/perfil`, { headers: this.headers } );
    }

    obtenerTablero(page: number, size: number): Observable<Paginacion>{
        return this.http.get<Paginacion>(`${this.url}/tablero?page=${page}&size=${size}`, { headers: this.headers});
    }

    editarTablero(tablero: ActualizarTablero): Observable<Tablero>{
        return this.http.put<Tablero>(`${this.url}/tablero`, tablero, {headers: this.headers});
    }

    eliminarTablero(idTablero: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/tablero/${idTablero}`, {headers: this.headers});
    }

    agregarTablero(tablero: RegistrarTablero): Observable<Tablero>{
        return this.http.post<Tablero>(`${this.url}/tablero`, tablero, {headers: this.headers});
    }


}
