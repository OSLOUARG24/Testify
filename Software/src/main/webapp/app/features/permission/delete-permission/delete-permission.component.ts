import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionService } from '../permission.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete-permission',
  standalone: true,
  imports: [],
  templateUrl: './delete-permission.component.html',
  styleUrl: './delete-permission.component.css'
})
export class DeletePermissionComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { permission: any },
    private permissionService: PermissionService,
    private snackBar: MatSnackBar
  ) {}

    onConfirm(): void {
      this.permissionService.deletePermission(this.data.permission.id).subscribe({
        next: () => {
          this.snackBar.open(`Permiso ${this.data.permission.name} eliminado`, 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open(`Error al eliminar el permiso: Verifique que el permiso no este en uso y reintente nuevamente`, 'Cerrar', {
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


