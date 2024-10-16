import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private selectedProjectSubject = new BehaviorSubject<Project | null>(null);
  selectedProject$ = this.selectedProjectSubject.asObservable();

  private apiUrl = 'http://localhost:8080/api';  // URL de tu API backend

  constructor(private http: HttpClient) {}

  // Obtener todos los proyectos
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl + '/projects');
  }

  // Crear un nuevo proyecto
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl + '/project', project);
  }

  // Actualizar un proyecto existente
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/project/${id}`, project);
  }

  // Eliminar un proyecto por ID
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/project/${id}`);
  }

  // Obtener un proyecto por ID
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/project/${id}`);
  }

  getProjectsByEmail(email: string):  Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects/user-email/${email}`);
  }

  setSelectedProject(project: Project): void {
    this.selectedProjectSubject.next(project);
    sessionStorage.setItem('project', JSON.stringify(project)); // Tambi�n guardamos en SessionStorage
  }

  getSelectedProject(): Project | null {
    const project = sessionStorage.getItem('project');
    return project ? JSON.parse(project) : null;
  }
}
