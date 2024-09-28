import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from '../role.service';


@Component({
  selector: 'app-delete-role',
  standalone: true,
  imports: [],
  templateUrl: './delete-role.component.html',
  styleUrl: './delete-role.component.css'
})
export class DeleteRoleComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { role: any },
    private roleService: RoleService
  ) {}

  onConfirm(): void {
      this.roleService.deleteRole(this.data.role.id).subscribe({
        next: (response: string) => {
          console.log(`Rol ${this.data.role.name} eliminado`);
          console.log('Respuesta del servidor:', response);  // El texto "Rol eliminado correctamente."
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al eliminar el rol', err);
          this.dialogRef.close(false);
        }
      });
    }

    onCancel(): void {
      this.dialogRef.close(false);
    }
}


