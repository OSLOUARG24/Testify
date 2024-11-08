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
      this.stagesToDo = stages.filter(stage => stage.status !== StageStatus.APROBADO);
      this.stagesCompleted = stages.filter(stage => stage.status === StageStatus.APROBADO);
    });
  }

  getStatusDescription(status: StageStatus): string {
          const descriptions = {
            [StageStatus.PENDIENTE]: 'Pendiente',
            [StageStatus.APROBADO]: 'Aprobado',
            [StageStatus.ERROR]: 'Error',
            [StageStatus.FINALIZADO]: 'Finalizado',
          };
        return descriptions[status] || status;
      }

  getProgress(stage: any): number {
    const totalSteps = stage.steps.length;
    const completedSteps = stage.steps.filter((step: any) => step.status === StageStatus.APROBADO).length;

    const totalChecklists = stage.checkLists.length;
    const completedChecklists = stage.checkLists.filter((checklist: any) => checklist.status == true).length;

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
}

