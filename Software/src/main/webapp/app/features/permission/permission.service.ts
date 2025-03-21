import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Permission } from './permission.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PermissionService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(protected http: HttpClient) { }

   getPermissions(): Observable<Permission[]> {
      return this.http.get<Permission[]>(this.apiUrl + '/permission');
    }

   getPermission(id: number): Observable<Permission> {
          const url = `${this.apiUrl}/permission/${id}`;
          return this.http.get<Permission>(url);
   }

   getPermissionById(id: number): Observable<Permission> {
      return this.http.get<Permission>(`${this.apiUrl}/permission/${id}`);
   }

   updatePermission(permission: Permission): Observable<Permission> {
       return this.http.put<Permission>(`${this.apiUrl}/permission/${permission.id}`, permission);
     }

   createPermission(permission: Permission): Observable<Permission> {
      return this.http.post<Permission>(this.apiUrl + '/permission', permission);
   }

   deletePermission(id: number): Observable<string> {
       return this.http.delete(`${this.apiUrl}/permission/${id}`, { responseType: 'text' }).pipe(
         catchError(error => {
           return throwError(() => new Error(error.error || 'Error al eliminar el permiso'));
         })
       );
     }

}
