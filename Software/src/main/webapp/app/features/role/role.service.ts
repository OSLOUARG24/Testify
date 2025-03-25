import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Role } from './role.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(protected http: HttpClient) { }

   getRoles(): Observable<Role[]> {
      return this.http.get<Role[]>(this.apiUrl + '/roles');
   }

   getRoleById(id: number): Observable<Role> {
      return this.http.get<Role>(`${this.apiUrl}/role/${id}`);
   }

   updateRole(role: Role): Observable<Role> {
       return this.http.put<Role>(`${this.apiUrl}/role/${role.id}`, role);
     }

   createRole(role: Role): Observable<Role> {
      return this.http.post<Role>(this.apiUrl + '/role', role);
   }

   deleteRole(id: number): Observable<string> {
         return this.http.delete(`${this.apiUrl}/role/${id}`, { responseType: 'text' }).pipe(
           catchError(error => {
             return throwError(() => new Error(error.error || 'Error al eliminar el Rol'));
           })
         );
       }
   

}
