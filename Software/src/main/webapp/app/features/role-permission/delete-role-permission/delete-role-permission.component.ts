import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolePermissionService } from '../role-permission.service';

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
    private rolePermissionService: RolePermissionService
  ) {}

  onConfirm(): void {
      this.rolePermissionService.deleteRolePermission(this.data.rolePermission.id).subscribe({
        next: (response: string) => {
          console.log(`Permiso ${this.data.rolePermission.name} eliminado`);
          console.log('Respuesta del servidor:', response);  // El texto "Permiso eliminado correctamente."
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al eliminar el permiso', err);
          this.dialogRef.close(false);
        }
      });
    }

    onCancel(): void {
      this.dialogRef.close(false);
    }
}


