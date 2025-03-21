import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from '../role.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
      this.roleService.deleteRole(this.data.role.id).subscribe({
        next: () => {
          this.snackBar.open(`Rol ${this.data.role.name} eliminado`, 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open(`Error al eliminar el rol: Verifique que el rol no este en uso y reintente nuevamente`, 'Cerrar', {
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


