import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Project, ProjectApprovalStatus } from './project.model';
import { IterationStatus } from '../iteration/iteration.model';

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

  exportPDF(projectId: number, includeStatus: boolean, includeStageDetail: boolean) {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        });
    return this.http.post(this.apiUrl + '/project/export', null, {
                                                               headers: headers,
                                                               responseType: 'blob',
                                                               params: {
                                                                 projectId: projectId.toString(),
                                                                 includeStatus: includeStatus.toString(),
                                                                 includeStageDetail: includeStageDetail.toString()
                                                               }
                                                             });
  }

  getIterationStatusByProjectId(id: number): Observable<IterationStatus[]> {
      return this.http.get<IterationStatus[]>(`${this.apiUrl}/iteration-status/${id}`);
  }

  getApprovalStatus(id: number): Observable<{ approvalPercentage: number }> {
      return this.http.get<{ approvalPercentage: number }>(`${this.apiUrl}/project-approval-status/${id}`);
  }

}
