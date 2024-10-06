
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleAssigmentService } from '../role-assigment.service';

@Component({
  selector: 'app-delete-role-assigment',
  standalone: true,
  imports: [],
  templateUrl: './delete-role-assigment.component.html',
  styleUrl: './delete-role-assigment.component.css'
})
export class DeleteRoleAssigmentComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteRoleAssigmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roleAssigment: any },
    private roleAssigmentService: RoleAssigmentService
  ) {}

  onConfirm(): void {
      this.roleAssigmentService.deleteRoleAssigment(this.data.roleAssigment.id).subscribe({
        next: (response: string) => {
          console.log(`Rol ${this.data.roleAssigment.role?.name} eliminado`);
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


