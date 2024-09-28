import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from './user.model';

export type EntityResponseType = HttpResponse<User>;
export type EntityArrayResponseType = HttpResponse<User[]>;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(protected http: HttpClient) { }

   find(id: number): Observable<EntityResponseType> {
       return this.http.get<User>(`${this.apiUrl}/user/${id}`, { observe: 'response' });
   }

    getUserByEmail(email: string): Observable<User> {
       const url = `${this.apiUrl}/user/email/${email}`;
       return this.http.get<User>(url);
     }

   getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl + '/users');
   }

   // Obtener usuario por ID
     getUserById(id: number): Observable<User> {
       return this.http.get<User>(`${this.apiUrl}/user/${id}`);
     }

     // Crear usuario
     createUser(user: User): Observable<User> {
       return this.http.post<User>(`${this.apiUrl}/user`, user);
     }

     // Actualizar usuario
     updateUser(user: User): Observable<User> {
       return this.http.put<User>(`${this.apiUrl}/user/${user.id}`, user);
     }

     deleteUser(userId: number): Observable<void> {
       return this.http.delete<void>(`${this.apiUrl}/user/${userId}`);
     }

}
