import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacionTarea, Tarea } from '../interfaces/tarea';

@Injectable({
    providedIn: 'root',
})
export class TareasService {
    private url: string = environment.HOST;

    get headers(): HttpHeaders {
        return new HttpHeaders().set(
            'Authorization',
            'Bearer ' + sessionStorage.getItem('token') || ''
        );
    }

    constructor(private http: HttpClient, private router: Router) {}

    obtenerTareas(
        id: number,
        page: number,
        size: number
    ): Observable<PaginacionTarea> {
        return this.http
            .get<any>(
                `${this.url}/tarea/tablero/${id}?size=${size}&page=${page}`,
                { headers: this.headers }
            )
            .pipe(
                map((r) => {
                    const pag: PaginacionTarea = {
                        page: r.pageable.pageNumber,
                        size: r.pageable.pageSize,
                        tareas: r.content,
                        elementosTotales: r.totalElements,
                    };
                    return pag;
                })
            );
    }

    completarTarea(tarea: Tarea): Observable<Tarea> {
        const t: Tarea = { ...tarea, finalizado: !tarea.finalizado };

        return this.http
            .put<void>(`${this.url}/tarea`, t, { headers: this.headers })
            .pipe(map(() => t));
    }

    actualizarTarea(tarea: Tarea): Observable<Tarea> {
        return this.http.put<Tarea>(`${this.url}/tarea`, tarea, {
            headers: this.headers,
        });
    }

    agregarTarea(tarea: Tarea): Observable<Tarea> {
        return this.http.post<Tarea>(`${this.url}/tarea`, tarea, {
            headers: this.headers,
        });
    }

    eliminarTarea(id: number): Observable<number> {
        return this.http
            .delete<number>(`${this.url}/tarea/${id}`, {
                headers: this.headers,
            })
            .pipe(map(() => id));
    }
}
