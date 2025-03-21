import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
    this.userService.deleteUser(this.data.user.id).subscribe({
      next: () => {
        this.snackBar.open(`Usuario ${this.data.user.name} eliminado`, 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open(`Error al eliminar el usuario: Verifique que el usuario no este asignado a un escenario ni contenga roles y permisos y reintente nuevamente`, 'Cerrar', {
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
