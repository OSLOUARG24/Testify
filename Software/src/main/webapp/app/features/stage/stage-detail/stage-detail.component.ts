import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkActive, RouterLink  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StageService } from '../stage.service';
import { Stage, Document } from '../stage.model';
import { RoleAssigment } from '../../../features/role-assigment/role-assigment.model';
import { User } from '../../../features/user/user.model';

@Component({
  selector: 'app-stage-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './stage-detail.component.html',
  styleUrls: ['./stage-detail.component.css']
})
export class StageDetailComponent implements OnInit {

  stage!: Stage;
  stageId?: number;
  roleAssigments: RoleAssigment[] = [];
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private stageService: StageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStorageValues();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.stageId = +id;
        this.loadStageData(+id);
      }
    });
  }

  loadStageData(id: number): void {
    this.stageService.getStageById(id).subscribe(
      (stage: Stage) => {
        this.stage = stage;
      },
      (error) => {
        console.error('Error loading stage', error);
      }
    );
  }

  copyToClipboard(): void {
    const textToCopy = JSON.stringify(this.stage, null, 2); // Copia los datos del stage como un JSON legible
    navigator.clipboard.writeText(textToCopy).then(
      () => alert('Datos copiados al portapapeles'),
      (err) => console.error('Error al copiar', err)
    );
  }

  goBack(): void {
    window.history.back();
  }

  copyStage(): void {
    if (this.stageId){
      this.stageService.copyStage(this.stageId).subscribe(
        (response) => {
          console.log('Stage copiado exitosamente', response);
        },
        (error) => {
          console.error('Error al copiar el stage', error);
        });
    }
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
  }

  hasRole(roleCode: string): boolean {
    return this.roleAssigments.some((assignment: RoleAssigment) => assignment.role?.code === roleCode);
  }

  canCopy() {
     if (this.user?.admin || this.hasRole('GESTOR')){
       return true;
     }
     return false;
   }

  isGestor() {
     return ;
  }

  isInvitado() {
     return this.hasRole('GUEST');
  }

  isTester(): boolean {
     return this.hasRole('TESTER');
  }


}
