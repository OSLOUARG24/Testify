import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectStatus } from './project.model';
import { ProjectService } from './project.service';
import { IterationStatus } from '../iteration/iteration.model';
import { CategoryStatus } from '../category/category.model';
import { StageService } from '../stage/stage.service';
import { Stage } from '../stage/stage.model';
import { User } from '../user/user.model';
import { BaseChartDirective } from 'ng2-charts';
import { Router, RouterOutlet,RouterLinkActive,RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { RoleAssigmentService } from '../../features/role-assigment/role-assigment.service';
import { CommonModule } from '@angular/common';
import { RoleAssigment } from '../role-assigment/role-assigment.model';
import { NavbarService } from '../../core/components/navbar/navbar.service'; // Importa el servicio

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, BaseChartDirective],
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
   roleAssigments: RoleAssigment[] = [];
   iterationStatus?: IterationStatus[];
   categoryStatus?: CategoryStatus[];
   matrix: any[] = [];
   columns: string[] = [];
   approvalStatuses: { [projectId: number]: number } = {};

   permissions: string[] = []; // Lista de permisos del usuario

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
              ,protected roleAssigmentService: RoleAssigmentService
              ,public dialog: MatDialog
              ,protected router: Router
              ,protected navbarService: NavbarService
              ,protected stageService: StageService) {}

   ngOnInit(): void {
      this.getStorageValues();
      if (this.project) {
           this.projects = this.projects || []; // Inicializa el array si está undefined
           this.projects.push(this.project); // Agrega el proyecto del sessionStorage
           this.loadStages(this.project.id!);
           this.loadPermissions(this.project?.id!);
           this.loadIterationStatus();
           this.loadApprovalStatuses();
      }
      else {
         this.projects = [];
         this.getAllProjects();
         this.loadPermissions(0);
         this.loadIterationStatus();
         this.loadAllStages();
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
           this.loadApprovalStatuses();
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

    loadAllStages(): void {
        this.stageService.getStages().subscribe(
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

   loadIterationStatus(): void {

     let pr = 0;
     if (this.project){
       pr = this.project.id;
     }
     else {
       pr = 0;
     }
     this.projectService.getIterationStatusByProjectId(pr).subscribe(
       (data: IterationStatus[]) => {
         this.iterationStatus = data;
       },
       error => console.error('Error al obtener reporte de iteraciones', error)
     );

     this.projectService.getCategoryStatusByProjectId(pr).subscribe(
          (data: CategoryStatus[]) => {
            this.categoryStatus = data;
          },
          error => console.error('Error al obtener reporte de categorías', error)
        );

     this.projectService.getMatrix(pr).subscribe((data) => {
           this.matrix = data;

           if (data.length > 0) {
             this.columns = Object.keys(data[0]);
           }
         });
   }

   getStorageValues() {
    const user = localStorage.getItem('user');
    if (user){
       this.user = JSON.parse(user);
    }

    const roles = sessionStorage.getItem('userRoles');
    if (roles){
      this.roleAssigments = JSON.parse(roles);
    }

    const project = sessionStorage.getItem('project');
      if (project){
        this.project = JSON.parse(project);
      }
  }

  loadApprovalStatuses(): void {
      if (this.projects) {
          this.projects.forEach(project => {

              this.approvalStatuses[project.id] = 0;
              this.projectService.getApprovalStatus(project.id).subscribe(
                  (status) => {
                      this.approvalStatuses[project.id] = status.approvalPercentage || 0; // Almacena el porcentaje
                  },
                  error => {
                       alert(error);
                      console.error(`Error al obtener el porcentaje de aprobación para el proyecto ${project.id}`, error);
                      this.approvalStatuses[project.id] = 0; // Valor predeterminado en caso de error
                  }
              );
          });
      }
  }

getProjectProgress(projectId: number): number {
    return this.approvalStatuses[projectId] || 0;
}

  getProgressBarClass(progress: number): string {
    if (progress >= 75) {
        return 'bg-success'; // Verde si el progreso es >= 75%
    } else if (progress >= 50) {
        return 'bg-warning'; // Amarillo si el progreso es >= 50%
    } else {
        return 'bg-danger'; // Rojo si el progreso es < 50%
    }
  }

isTextOverflow(text: string): boolean {
  const tempSpan = document.createElement('span');
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.whiteSpace = 'nowrap';
  tempSpan.style.position = 'absolute';
  tempSpan.innerText = text;
  document.body.appendChild(tempSpan);

  const isOverflow = tempSpan.offsetWidth > 200; // Compara con el max-width
  document.body.removeChild(tempSpan);

  return isOverflow;
}

loadPermissions(projectId: number) {
  if (!this.user) {
    this.permissions = [];
    return;
  }

 this.roleAssigmentService.getPermissionsByUserIdAndProjectId(this.user.id!,projectId).subscribe((data) => {
  this.permissions = data;
});

  
}

hasPermission(permission: string): boolean {
  // Dividir el permiso en palabras
  const words = permission.split('_');

  // Si hay menos de 2 palabras, hacer la verificación normal
  if (words.length < 2) {
    return this.permissions.includes(permission);
  }

  // Obtener las dos primeras palabras del permiso
  const prefix = words.slice(0, 2).join('_'); // Ejemplo: "Consultar Iteraciones"

  // Buscar si algún permiso almacenado empieza con esas dos palabras
  return this.permissions.some(perm => perm.startsWith(prefix));
}


redirectToIterations(project: Project) {
       sessionStorage.setItem('project',JSON.stringify(project))
       this.navbarService.notifyProjectChanged();
       this.router.navigate(['/iteration',project.id]);
}

}
