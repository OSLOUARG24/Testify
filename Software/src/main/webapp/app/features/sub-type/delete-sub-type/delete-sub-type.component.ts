import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubTypeService } from '../sub-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-sub-type',
  standalone: true,
  imports: [],
  templateUrl: './delete-sub-type.component.html',
  styleUrl: './delete-sub-type.component.css'
})
export class DeleteSubTypeComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteSubTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { subType: any },
    private subTypeService: SubTypeService,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
    this.subTypeService.deleteSubType(this.data.subType.id).subscribe({
      next: () => {
        this.snackBar.open(`Subtipo ${this.data.subType.name} eliminado`, 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open(`Error al eliminar el subtipo: Verifique que el subtipo no este en uso y reintente nuevamente`, 'Cerrar', {
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
