import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { RoleAssigment } from './role-assigment.model';
import { catchError } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<RoleAssigment>;
export type EntityArrayResponseType = HttpResponse<RoleAssigment[]>;

@Injectable({
  providedIn: 'root'
})

export class RoleAssigmentService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(protected http: HttpClient) { }

   find(id: number): Observable<EntityResponseType> {
       return this.http.get<RoleAssigment>(`${this.apiUrl}/roleAssigment/${id}`, { observe: 'response' });
   }

   getRoleAssigments(): Observable<RoleAssigment[]> {
        return this.http.get<RoleAssigment[]>(this.apiUrl + '/roleAssigments');
   }

   // Obtener usuario por ID
     getRoleAssigmentById(id: number): Observable<RoleAssigment> {
       return this.http.get<RoleAssigment>(`${this.apiUrl}/roleAssigment/${id}`);
     }

    // Obtener usuario por ID
      getRoleAssigmentByUserId(id: number): Observable<RoleAssigment[]> {
        return this.http.get<RoleAssigment[]>(`${this.apiUrl}/roleAssigments/user/${id}`);
      }

     getRoleAssigmentByProjectId(id: number): Observable<RoleAssigment[]> {
       return this.http.get<RoleAssigment[]>(`${this.apiUrl}/roleAssigments/project/${id}`);
     }

     // Crear usuario
     createRoleAssigment(roleAssigment: RoleAssigment): Observable<RoleAssigment> {
       return this.http.post<RoleAssigment>(this.apiUrl + '/roleAssigment', roleAssigment);
     }

     // Actualizar usuario
     updateRoleAssigment(roleAssigment: RoleAssigment): Observable<RoleAssigment> {
       return this.http.put<RoleAssigment>(`${this.apiUrl}/roleAssigment/${roleAssigment.id}`, roleAssigment);
     }

     deleteRoleAssigment(id: number): Observable<string> {
              return this.http.delete(`${this.apiUrl}/roleAssigment/${id}`, { responseType: 'text' }).pipe(
                catchError(error => {
                  return throwError(() => new Error(error.error || 'Error al eliminar el Rol Asignado'));
                })
              );
            }

     getRoleAssigmentsByEmailAndProject(email: string, id: number): Observable<RoleAssigment[]> {
       const params = new HttpParams()
             .set('email', email)
             .set('pId', id.toString());

           return this.http.get<RoleAssigment[]>(`${this.apiUrl}/roleAssigments/roles`, { params });
     }

     getPermissionsByUserIdAndProjectId(idUser: number,idProject: number): Observable<string[]> {
      const params = new HttpParams()
             .set('uId', idUser.toString())
             .set('pId', idProject.toString());
      return this.http.get<string[]>(`${this.apiUrl}/roleAssigments/permissions/user`, { params });
    }

}
