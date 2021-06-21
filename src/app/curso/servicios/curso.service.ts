import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppServiceBase } from 'src/app/core/appServiceBase';
import { environment } from 'src/environments/environment';
import { Curso } from '../modelo/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoService extends AppServiceBase {
  url: string = `${environment.api.baseUrl}`;

  crearCurso(curso: Curso): Observable<any> {
    return this.post(`courses`, curso).pipe(
      map((response: any) => response.curso as Curso),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  listarCursosPublicos(): Observable<any> {
    return this.get('courses').pipe(catchError(this.handleError));
  }

  obtenerCurso(id: number): Observable<any> {
    return this.get(`courses/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError('Cannot perform the request, please try again later');
  }
}
