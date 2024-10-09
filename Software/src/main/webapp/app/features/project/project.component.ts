import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { Router, RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProjectComponent } from './delete-project/delete-project.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
   project?: Project | null;
   projects?: Project[];
   projectId?: number ;

   constructor(protected route: ActivatedRoute
              ,protected projectService: ProjectService
              ,public dialog: MatDialog) {}

   ngOnInit(): void {
       const projectSS = sessionStorage.getItem('project');
       if (projectSS) {
         this.project = JSON.parse(projectSS);
         //this.projects = this.projects || []; // Inicializa el array si está undefined
          if (this.project) {
               this.projects = this.projects || []; // Inicializa el array si está undefined
               this.projects.push(this.project); // Agrega el proyecto del sessionStorage
          }
       }
       else {
         this.projects = [];
         this.getAllProjects();
       }
   }

     // Obtener todos los proyectos
     getAllProjects() {
       this.projectService.getProjects().subscribe(
         (data: Project[]) => {
           this.projects = data;
         },
         error => {
           console.error('Error al obtener proyectos', error);
         }
       );
     }

    Cancel(): void {
        window.history.back();
      }

       openDeleteModal(project: any): void {
                const dialogRef = this.dialog.open(DeleteProjectComponent, {
                  width: '600px',
                  data: { project: project }
                });

                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.fetchProjects();
                  }
                });
              }

              fetchProjects(): void {
                this.projectService.getProjects().subscribe(projects => {
                  this.projects = projects;
                });
              }

}
