import { Component, OnInit } from '@angular/core';
import { StageService } from './stage.service';
import { Stage, StageStatus } from './stage.model';
import { User } from '../user/user.model';
import { Project } from '../project/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkActive, RouterLink  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeleteStageComponent } from './delete-stage/delete-stage.component';
import { RoleAssigment } from '../role-assigment/role-assigment.model';
import { RoleAssigmentService } from '../../features/role-assigment/role-assigment.service';

@Component({
  selector: 'app-stage',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css'
})
export class StageComponent implements OnInit {
  iterationId?: number;
  stages: Stage[] = [];
  project?: Project;
  user?: User;
  roleAssigments: RoleAssigment[] = [];

  permissions: string[] = []; // Lista de permisos del usuario

  constructor(private stageService: StageService,
    private route: ActivatedRoute,
    private router: Router,
    private roleAssigmentService: RoleAssigmentService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getStorageValues();
    let iterationIdParam = this.route.snapshot.paramMap.get('id');
    if (iterationIdParam){ sessionStorage.setItem('Iid',iterationIdParam);}
    else { iterationIdParam =  sessionStorage.getItem('Iid')!;}
    this.iterationId = iterationIdParam ? +iterationIdParam : undefined;
      this.stageService.getStagesbyIterationId(this.iterationId!).subscribe(stages => {
        this.stages = stages;
      });
  }

  goBack(): void {
    const project = sessionStorage.getItem('project');
    if (project){
      this.project = JSON.parse(project);
      this.router.navigate(['/iteration',this.project!.id]);
      }
    else
    {
      this.router.navigate(['/iteration']);
      }
  }

  getProgress(stage: any): number {
    const totalSteps = stage.steps.length;
    const completedSteps = stage.steps.filter((step: any) => step.status !== StageStatus.PENDIENTE).length;

    const totalChecklists = stage.checkLists.length;
    const completedChecklists = stage.checkLists.filter((checklist: any) => checklist.status == true).length;

    const totalItems = totalSteps + totalChecklists;
    const completedItems = completedSteps + completedChecklists;

    return totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
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

  getStatusDescription(status: StageStatus): string {
      const descriptions = {
        [StageStatus.PENDIENTE]: 'Pendiente',
        [StageStatus.APROBADO]: 'Aprobado',
        [StageStatus.ERROR]: 'Error'
      };
    return descriptions[status] || status;
  }

openDeleteModal(stage: any): void {
                const dialogRef = this.dialog.open(DeleteStageComponent, {
                  width: '600px',
                  data: { stage: stage }
                });

                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    this.fetchStages();
                  }
                });
              }

              fetchStages(): void {
                this.stageService.getStagesbyIterationId(this.iterationId!).subscribe(stages => {
                  this.stages = stages;
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
    else {
      this.project = undefined;
      }

      this.roleAssigmentService.getPermissionsByUserIdAndProjectId(this.user?.id!,this.project?.id!).subscribe((data) => {
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
}

