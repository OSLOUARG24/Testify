import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { Category } from './category.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/category/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + '/categories');
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(this.apiUrl + '/category', category).pipe(
          catchError(error => {
            return throwError(() => new Error(error.error || 'Error creating category'));
          })
        );
  }

  updateCategory(id: number, category: Category): Observable<any> {
    return this.http.put(`${this.apiUrl}/category/${id}`, category).pipe(
         catchError(error => {
           return throwError(() => new Error(error.error || 'Error updating category'));
         })
       );
  }
  
  deleteCategory(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/category/${id}`, { responseType: 'text' });
  }
}
