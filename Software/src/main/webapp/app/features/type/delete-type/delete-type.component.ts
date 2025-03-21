import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeService } from '../type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-type',
  standalone: true,
  imports: [],
  templateUrl: './delete-type.component.html',
  styleUrl: './delete-type.component.css'
})
export class DeleteTypeComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: any },
    private typeService: TypeService,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
    this.typeService.deleteType(this.data.type.id).subscribe({
      next: () => {
        this.snackBar.open(`Tipo ${this.data.type.name} eliminado`, 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open(`Error al eliminar el tipo: Verifique que el tipo no este en uso y reintente nuevamente`, 'Cerrar', {
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
