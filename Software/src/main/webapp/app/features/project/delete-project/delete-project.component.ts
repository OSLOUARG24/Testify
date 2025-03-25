import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-project',
  standalone: true,
  imports: [],
  templateUrl: './delete-project.component.html',
  styleUrl: './delete-project.component.css'
})
export class DeleteProjectComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: any },
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
    this.projectService.deleteProject(this.data.project.id).subscribe({
      next: () => {
        this.snackBar.open(`Proyecto ${this.data.project.name} eliminado`, 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open(`Error al eliminar el proyecto: Verifique que el proyecto no este en uso y reintente nuevamente`, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.dialogRef.close(false);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
