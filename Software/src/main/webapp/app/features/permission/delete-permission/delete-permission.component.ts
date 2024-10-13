import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionService } from '../permission.service';


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
    private permissionService: PermissionService
  ) {}

  onConfirm(): void {
      this.permissionService.deletePermission(this.data.permission.id).subscribe({
        next: (response: string) => {
          console.log(`Permiso ${this.data.permission.name} eliminado`);
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


