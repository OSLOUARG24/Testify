import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { RolePermission } from './role-permission.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RolePermissionService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(protected http: HttpClient) { }

   getPermissionsByRoleId(id: number): Observable<RolePermission[]> {
      return this.http.get<RolePermission[]>(`${this.apiUrl}/rolePermissions/role/${id}`);
    }

   getRolePermissionById(id: number): Observable<RolePermission> {
      return this.http.get<RolePermission>(`${this.apiUrl}/rolePermission/${id}`);
   }

   updateRolePermission(rolePermission: RolePermission): Observable<RolePermission> {
       alert(JSON.stringify(rolePermission));
       return this.http.put<RolePermission>(`${this.apiUrl}/rolePermission/${rolePermission.id}`, rolePermission);
     }

   createRolePermission(rolePermission: RolePermission): Observable<RolePermission> {
      return this.http.post<RolePermission>(this.apiUrl + '/rolePermission', rolePermission);
   }

   deleteRolePermission(id: number): Observable<string> {
      return this.http.delete(`${this.apiUrl}/rolePermission/${id}`, { responseType: 'text' }).pipe(
        catchError(error => {
          return throwError(() => new Error(error.error || 'Error al eliminar el Permiso Asignado'));
        })
      );
    }

    getPermissionsByRoleAndPermissionId(roleId: number, permissionId: number): Observable<RolePermission[]> {
      return this.http.get<RolePermission[]>(`${this.apiUrl}/rolePermissions/role/${roleId}`);
    }
}
