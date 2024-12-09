import { Component, OnInit } from '@angular/core';
import { StageService } from '../stage.service'; // Servicio que trae los stages
import { Stage, StageStatus } from '../stage.model';
import { User } from '../../user/user.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tester-stage',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './tester-stage.component.html',
  styleUrls: ['./tester-stage.component.css']
})
export class TesterStageComponent implements OnInit {

  stagesToDo: any[] = [];  // Stages pendientes
  stagesCompleted: any[] = [];  // Stages finalizados
  user?: User;

  constructor(private stageService: StageService) { }

  ngOnInit(): void {
    // Obtener los stages al iniciar el componente
    const user = localStorage.getItem('user');
    if (user){
      this.user = JSON.parse(user);
    }
    this.loadStages();
  }

  // Cargar los stages
  loadStages(): void {
    this.stageService.getStagesForUser(this.user?.id!).subscribe((stages: Stage[]) => {
      console.log(JSON.stringify(stages));
      // Separar los stages según el estado
      this.stagesToDo = stages.filter(stage => stage.status === StageStatus.PENDIENTE);
      this.stagesCompleted = stages.filter(stage => stage.status !== StageStatus.PENDIENTE);
    });
  }

  getStatusDescription(status: StageStatus): string {
          const descriptions = {
            [StageStatus.PENDIENTE]: 'Pendiente',
            [StageStatus.APROBADO]: 'Aprobado',
            [StageStatus.ERROR]: 'Error'
          };
        return descriptions[status] || status;
      }

  getProgress(stage: any): number {
    const totalSteps = stage.steps.length;
    const completedSteps = stage.steps.filter((step: any) => step.status !== StageStatus.PENDIENTE).length;

     const validChecklists = stage.checkLists.filter((checklist: any) => checklist.status !== null && checklist.status !== undefined);
     const totalChecklists = validChecklists.length;
     const completedChecklists = validChecklists.filter((checklist: any) => checklist.status === true).length;

     const totalItems = totalSteps + totalChecklists;
     const completedItems = completedSteps + completedChecklists;

     return totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
  }

  // Método para asignar colores a la barra de progreso
  getProgressBarClass(progress: number): string {
    if (progress >= 75) {
      return 'bg-success';
    } else if (progress >= 50) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }

getStatusClass(status: StageStatus): string {
  switch (status) {
    case StageStatus.PENDIENTE:
      return 'text-blue';
    case StageStatus.ERROR:
      return 'text-red';
    case StageStatus.APROBADO:
      return 'text-green';
    default:
      return '';
  }
}
}

