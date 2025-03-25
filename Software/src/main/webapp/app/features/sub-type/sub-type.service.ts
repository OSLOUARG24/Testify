import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError  } from 'rxjs';
import { SubType } from './sub-type.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubTypeService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getSubTypeById(id: number): Observable<SubType> {
    return this.http.get<SubType>(`${this.apiUrl}/subType/${id}`);
  }

  getSubTypes(): Observable<SubType[]> {
    return this.http.get<SubType[]>(this.apiUrl + '/subTypes');
  }

  createSubType(subType: SubType): Observable<any> {
    return this.http.post(this.apiUrl + '/subType', subType).pipe(
          catchError(error => {
            return throwError(() => new Error(error.error || 'Error creando subtipo'));
          })
        );
  }

  updateSubType(id: number, subType: SubType): Observable<any> {
    return this.http.put(`${this.apiUrl}/subType/${id}`, subType).pipe(
         catchError(error => {
           return throwError(() => new Error(error.error || 'Error updating category'));
         })
       );
  }

  getSubTypesByTypeId(id: number): Observable<SubType[]> {
    return this.http.get<SubType[]>(`${this.apiUrl}/subTypes/type/${id}`);
  }

  deleteSubType(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/subType/${id}`, { responseType: 'text' }).pipe(
      catchError(error => {
        return throwError(() => new Error(error.error || 'Error al eliminar el Subtipo'));
      })
    );
  }
}
