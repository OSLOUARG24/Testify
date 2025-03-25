
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleAssigmentService } from '../role-assigment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private roleAssigmentService: RoleAssigmentService,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
      this.roleAssigmentService.deleteRoleAssigment(this.data.roleAssigment.id).subscribe({
        next: () => {
          this.snackBar.open(`Rol ${this.data.roleAssigment.role.name} desasignado`, 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open(`Error al desasignar el rol: Verifique que el rol no este en uso y reintente nuevamente`, 'Cerrar', {
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


