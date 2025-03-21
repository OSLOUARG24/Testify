import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IterationService } from '../iteration.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-iteration',
  standalone: true,
  imports: [],
  templateUrl: './delete-iteration.component.html',
  styleUrl: './delete-iteration.component.css'
})
export class DeleteIterationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteIterationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { iteration: any },
    private iterationService: IterationService,
    private snackBar: MatSnackBar
  ) {}

    onConfirm(): void {
      this.iterationService.deleteIteration(this.data.iteration.id).subscribe({
        next: () => {
          this.snackBar.open(`Iteración ${this.data.iteration.name} eliminada`, 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open(`Error al eliminar la iteración: Verifique que la iteración no este en uso y reintente nuevamente`, 'Cerrar', {
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
