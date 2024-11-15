import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectStatus } from './project.model';
import { ProjectService } from './project.service';
import { StageService } from '../stage/stage.service';
import { Stage } from '../stage/stage.model';
import { User } from '../user/user.model';
import { BaseChartDirective } from 'ng2-charts';
import { Router, RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProjectComponent } from './delete-project/delete-project.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BaseChartDirective],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
   project?: Project | null;
   projects?: Project[];
   projectId?: number ;
   projectStatus = ProjectStatus;
   stages: Stage[] = []; // Lista de escenarios cargados para un proyecto
   user?: User;

   public pieChartOptions: ChartOptions = {
           responsive: true,
         };
   public pieChartLabels: string[] = ['Pendiente', 'Aprobado', 'En Error'];
   public pieChartData: ChartData<'pie', number[], string> = {
       labels: this.pieChartLabels,
       datasets: []
     };
   public pieChartType: ChartType = 'pie';  //line - pie - bar

   constructor(protected route: ActivatedRoute
              ,protected projectService: ProjectService
              ,public dialog: MatDialog
              ,protected stageService: StageService) {}

   ngOnInit(): void {
       const projectSS = sessionStorage.getItem('project');
       if (projectSS) {
         this.project = JSON.parse(projectSS);
         //this.projects = this.projects || []; // Inicializa el array si está undefined
          if (this.project) {
               this.projects = this.projects || []; // Inicializa el array si está undefined
               this.projects.push(this.project); // Agrega el proyecto del sessionStorage
               this.loadStages(this.project.id!);
          }
       }
       else {
         this.projects = [];
         this.getAllProjects();
       }
       this.generateChartData();
   }

      getStatusDescription(status: ProjectStatus): string {
          const descriptions = {
            [ProjectStatus.PENDIENTE]: 'Pendiente',
            [ProjectStatus.EN_PROCESO]: 'En Proceso',
            [ProjectStatus.FINALIZADO]: 'Finalizado'
          };
        return descriptions[status] || status;
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

   loadStages(projectId: number): void {
      this.stageService.getStagesByProjectId(projectId).subscribe(
        (data: Stage[]) => {
          this.stages = data;
          this.generateChartData();
        },
        error => console.error('Error al obtener escenarios', error)
      );
    }

  generateChartData(): void {
      const statusCounts = { Pendiente: 0, Aprobado: 0, EnError: 0 };

      this.stages.forEach(stage => {
        if (stage.status === 'PENDIENTE') statusCounts.Pendiente++;
        else if (stage.status === 'APROBADO') statusCounts.Aprobado++;
        else if (stage.status === 'ERROR') statusCounts.EnError++;
      });

      this.pieChartData = {
        labels: this.pieChartLabels,
        datasets: [{ data: [statusCounts.Pendiente, statusCounts.Aprobado, statusCounts.EnError], label: 'Estados de Escenarios' }]
      };
    }

   isAdmin() {
       const user = localStorage.getItem('user');
         if (user){
            this.user = JSON.parse(user);
         }
       return this.user?.admin;
     }
}
