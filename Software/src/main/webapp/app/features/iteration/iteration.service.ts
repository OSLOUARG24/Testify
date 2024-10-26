import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Iteration } from './iteration.model';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  private apiUrl = 'http://localhost:8080/api';  // URL de tu API

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

    // Crear una nueva iteración
    createIteration(iteration: Iteration): Observable<Iteration> {
      return this.http.post<Iteration>(this.apiUrl + '/iteration', iteration);
    }

    // Actualizar una iteración existente
    updateIteration(id: number, iteration: Iteration): Observable<void> {
      return this.http.put<void>(`${this.apiUrl}/iteration/${id}`, iteration);
    }

  deleteIteration(iterationId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/iteration/${iterationId}`, { responseType: 'text' });
  }

}
