import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IterationService } from '../iteration.service';

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
    private iterationService: IterationService
  ) {}

  onConfirm(): void {
      this.iterationService.deleteIteration(this.data.iteration.id).subscribe({
        next: (response: string) => {
          console.log(`Iteración ${this.data.iteration.name} eliminada`);
          console.log('Respuesta del servidor:', response);
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al eliminar la iteración', err);
          this.dialogRef.close(false);
        }
      });
    }

    onCancel(): void {
      this.dialogRef.close(false);
    }

}
