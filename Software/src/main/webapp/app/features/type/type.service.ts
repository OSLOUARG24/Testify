import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from './type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getTypeById(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.apiUrl}/type/${id}`);
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.apiUrl + '/types');
  }

  // Método para eliminar una categoría por su ID
  deleteType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/type/${id}`);
  }

  // Método para crear una nueva categoría
  createType(type: Type): Observable<Type> {
    return this.http.post<Type>(this.apiUrl + '/type', type);
  }

  // Método para actualizar una categoría
  updateType(id: number, type: Type): Observable<Type> {
    return this.http.put<Type>(`${this.apiUrl}/type/${id}`, type);
  }
}
