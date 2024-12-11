import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Stage, Document } from './stage.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getStagesWithoutPrevious(id: number): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.apiUrl}/stages/no-previous/${id}`);
  }

  getStagesbyIterationId(id: number): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.apiUrl}/stages/${id}`);
  }

  getStages(): Observable<Stage[]> {
      return this.http.get<Stage[]>(`${this.apiUrl}/stages`);
  }


  getHistoryStages(id: number): Observable<Stage[]> {
        return this.http.get<Stage[]>(`${this.apiUrl}/stages/hist/${id}`);
    }

  getStageById(id: number): Observable<Stage> {
    return this.http.get<Stage>(`${this.apiUrl}/stage/${id}`);
  }

  createStage(stage: Stage): Observable<any> {
    return this.http.post(this.apiUrl + '/stage', stage).pipe(
     catchError(error => {
       return throwError(() => new Error(error.error || 'error al crear escenario'));
     })
    );
  }

  copyStage(id: number): Observable<Stage> {
    return this.http.post<Stage>(this.apiUrl + '/stage/copy',{ id: +id});

  }

  updateStage(id: number, stage: Stage): Observable<Stage> {
    return this.http.put<Stage>(`${this.apiUrl}/stage/${id}`, stage);
  }

  getStagesForUser(id: number): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.apiUrl}/stages/user/${id}`);
  }

  createDocument(id: number, documents: Document[]): Observable<any> {
    const formData = new FormData();
    formData.append('stageId', id.toString());

    documents.forEach((document: Document) => {
      const name = document.name;
      const description = document.description;
      const base64Content = document.document;

      formData.append('files', new File([document.document], name));
      formData.append('names', name);
      formData.append('descriptions', description);
    });
    return this.http.post(this.apiUrl + "/documents", formData).pipe(
       catchError(error => {
         return throwError(() => new Error(error.error || 'Error creating documents'));
       })
     );
  }


  b64toBlob(base64Data: string, contentType: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Eliminar un proyecto por ID
  deleteStage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/stage/${id}`);
  }

getStagesByProjectId(id: number) {
    return this.http.get<Stage[]>(`${this.apiUrl}/stages/project/${id}`);
  }

exportPDF(stageId: number) {
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
        });
    return this.http.post(this.apiUrl + '/stage/export', null, {
                                                               headers: headers,
                                                               responseType: 'blob',
                                                               params: {
                                                                 stageId: stageId.toString()
                                                               }
                                                             });
  }

}
