import { Component, OnInit } from '@angular/core';
import { StageService } from './stage.service';
import { Stage, StageStatus } from './stage.model';

import { ActivatedRoute, Router, RouterOutlet, RouterLinkActive, RouterLink  } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private stageService: StageService,
    private route: ActivatedRoute,
    private router: Router,) {}

  ngOnInit(): void {
  let iterationIdParam = this.route.snapshot.paramMap.get('id');
  if (iterationIdParam){ sessionStorage.setItem('Iid',iterationIdParam);}
  else { iterationIdParam =  sessionStorage.getItem('Iid')!;}
  this.iterationId = iterationIdParam ? +iterationIdParam : undefined;
    this.stageService.getStagesWithoutPrevious(this.iterationId!).subscribe(stages => {
      this.stages = stages;
    });
  }
  Cancel(): void {
    window.history.back();
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
}

