import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StageService } from '../stage.service';

@Component({
  selector: 'app-delete-stage',
  standalone: true,
  imports: [],
  templateUrl: './delete-stage.component.html',
  styleUrl: './delete-stage.component.css'
})
export class DeleteStageComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteStageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stage: any },
    private stageService: StageService
  ) {}

  onConfirm(): void {
    this.stageService.deleteStage(this.data.stage.id).subscribe({
      next: () => {
        console.log(`Proyecto ${this.data.stage.name} eliminado`);
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
