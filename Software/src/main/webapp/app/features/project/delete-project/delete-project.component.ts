import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../project.service';

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
    private projectService: ProjectService
  ) {}

  onConfirm(): void {
    this.projectService.deleteProject(this.data.project.id).subscribe({
      next: () => {
        console.log(`Proyecto ${this.data.project.name} eliminado`);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al eliminar el proyecto', err);
        this.dialogRef.close(false);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
