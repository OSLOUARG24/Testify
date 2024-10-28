import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Type } from './type.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getTypeById(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.apiUrl}/type/${id}`);
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.apiUrl + '/types');
  }

  createType(type: Type): Observable<any> {
    return this.http.post(this.apiUrl + '/type', type).pipe(
          catchError(error => {
            return throwError(() => new Error(error.error || 'Error creating category'));
          })
        );
  }

  updateType(id: number, type: Type): Observable<any> {
    return this.http.put(`${this.apiUrl}/type/${id}`, type).pipe(
         catchError(error => {
           return throwError(() => new Error(error.error || 'Error updating category'));
         })
       );
  }
  
  deleteType(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/type/${id}`, { responseType: 'text' });
  }
}
