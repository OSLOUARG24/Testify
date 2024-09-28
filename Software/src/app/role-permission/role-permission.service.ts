import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RolePermission } from './role-permission.model';

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
       return this.http.put<RolePermission>(`${this.apiUrl}/rolePermission/${rolePermission.id}`, rolePermission);
     }

   createRolePermission(rolePermission: RolePermission): Observable<RolePermission> {
      return this.http.post<RolePermission>(this.apiUrl + '/rolePermission', rolePermission);
   }

   deleteRolePermission(rolePermissionId: number): Observable<string>  {
     return this.http.delete(`${this.apiUrl}/rolePermission/${rolePermissionId}`, { responseType: 'text' });
   }


}
