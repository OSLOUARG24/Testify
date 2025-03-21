import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StageService } from '../stage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private stageService: StageService,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
    this.stageService.deleteStage(this.data.stage.id).subscribe({
      next: () => {
        this.snackBar.open(`Escenario ${this.data.stage.name} eliminado`, 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open(`Error al eliminar el escenario: Verifique que el escenario no este en uso y reintente nuevamente`, 'Cerrar', {
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
