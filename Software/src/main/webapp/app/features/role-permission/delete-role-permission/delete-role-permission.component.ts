import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolePermissionService } from '../role-permission.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-role-permission',
  standalone: true,
  imports: [],
  templateUrl: './delete-role-permission.component.html',
  styleUrl: './delete-role-permission.component.css'
})
export class DeleteRolePermissionComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRolePermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rolePermission: any },
    private rolePermissionService: RolePermissionService,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
      this.rolePermissionService.deleteRolePermission(this.data.rolePermission.id).subscribe({
        next: () => {
          this.snackBar.open(`Rol ${this.data.rolePermission.permission.name} desasignado`, 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open(`Error al desasignar el permiso: Verifique que el permiso no este en uso y reintente nuevamente`, 'Cerrar', {
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


