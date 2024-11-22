import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Iteration, IterationStatus } from './iteration.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getIterations(): Observable<Iteration[]> {
      return this.http.get<Iteration[]>(this.apiUrl +'/iterations');
    }

  getIterationsByProjectId(projectId: number): Observable<Iteration[]> {
    return this.http.get<Iteration[]>(`${this.apiUrl}/iterations/project/${projectId}`);
  }

  getIterationById(iterationId: number): Observable<Iteration> {
    return this.http.get<Iteration>(`${this.apiUrl}/iteration/${iterationId}`);
  }

    createIteration(iteration: Iteration): Observable<any> {
        return this.http.post(this.apiUrl + '/iteration', iteration).pipe(
          catchError(error => {
            return throwError(() => new Error(error.error || 'Error creating iteration'));
          })
        );
      }

    // Actualizar una iteración existente
    updateIteration(id: number, iteration: Iteration): Observable<any> {
      return this.http.put(`${this.apiUrl}/iteration/${id}`, iteration).pipe(
         catchError(error => {
           return throwError(() => new Error(error.error || 'Error updating iteration'));
         })
       );
    }

  deleteIteration(iterationId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/iteration/${iterationId}`, { responseType: 'text' });
  }

}
