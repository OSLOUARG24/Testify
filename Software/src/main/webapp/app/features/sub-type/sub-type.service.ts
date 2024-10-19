import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubType } from './sub-type.model';

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

  // Método para eliminar un subtipo por su ID
  deleteSubType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/subType/${id}`);
  }

  // Método para crear un nuevo subtipo
  createSubType(subType: SubType): Observable<SubType> {
    return this.http.post<SubType>(this.apiUrl + '/subType', subType);
  }

  // Método para actualizar una categoría
  updateSubType(id: number, subType: SubType): Observable<SubType> {
    return this.http.put<SubType>(`${this.apiUrl}/subType/${id}`, subType);
  }

  getSubTypesByTypeId(id: number): Observable<SubType[]> {
    return this.http.get<SubType[]>(`${this.apiUrl}/subTypes/type/${id}`);
  }
}
