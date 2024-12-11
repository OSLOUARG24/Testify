import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkActive, RouterLink  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StageService } from '../stage.service';
import { Stage, Document, StageStatus, Priority } from '../stage.model';
import { RoleAssigment } from '../../../features/role-assigment/role-assigment.model';
import { User } from '../../../features/user/user.model';
import { MIME_TYPES } from '../../../app.constants';

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
     if (this.stageId) {
       this.stageService.copyStage(this.stageId).subscribe(
         (response) => {
           console.log('Stage copiado exitosamente', response);
           // Redirige al componente update-stage con el id del nuevo stage
           this.router.navigate(['/stage/edit', response.id]);
         },
         (error) => {
           console.error('Error al copiar el stage', error);
         }
       );
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

  downloadFile(fileData: string | Blob, fileName: string) {
      if (!fileData) {
          alert("El archivo no está disponible para descargar.");
          return;
        }

      let blob: Blob;

      if (fileData instanceof Blob) {
        blob = fileData;
      } else {
        // Obtener la extensión del archivo
        const extension = fileName.split('.').pop()?.toLowerCase() || '';

        // Buscar el tipo MIME en el mapeo; si no se encuentra, usa 'application/octet-stream'
        const mimeType = MIME_TYPES[extension] || 'application/octet-stream';

        // Si el archivo tiene prefijo `data:...;base64,`, eliminarlo
        const base64Data = fileData.includes("base64,") ? fileData.split(",")[1] : fileData;

        // Decodificar Base64
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Crear Blob con el tipo MIME correcto
        blob = new Blob([byteArray], { type: mimeType });
      }
      // Crear URL de descarga
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url); // Limpiar URL temporal
    }

    getStatusDescription(status: StageStatus): string {
            const descriptions = {
              [StageStatus.PENDIENTE]: 'Pendiente',
              [StageStatus.APROBADO]: 'Aprobado',
              [StageStatus.ERROR]: 'Error'
            };
          return descriptions[status] || status;
        }

    getPriorityDescription(priority: Priority): string {
            const priorities = {
              [Priority.BAJO]: 'Bajo',
              [Priority.MEDIO]: 'Medio',
              [Priority.ALTO]: 'Alto',
              [Priority.URGENTE]: 'Urgente',
            };
          return priorities[priority] || priority;
        }

  exportStage(): void {

      this.stageService.exportPDF(this.stageId!
        ).subscribe(
            (response) => {
              const blob = new Blob([response], { type: 'application/pdf' });
              const url = window.URL.createObjectURL(blob);

              // Crear un enlace temporal para la descarga
              const link = document.createElement('a');
              link.href = url;
              link.download = `stage_report_${this.stageId}.pdf`;
              link.click();

              // Liberar el objeto URL después de la descarga
              window.URL.revokeObjectURL(url);
            },
            (error) => {
              console.error('Error downloading PDF', error);
            }
          );
    }

}
