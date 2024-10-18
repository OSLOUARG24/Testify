import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';

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
    private userService: UserService
  ) {}

  onConfirm(): void {
    this.userService.deleteUser(this.data.user.id).subscribe({
      next: () => {
        console.log(`Usuario ${this.data.user.name} eliminado`);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al eliminar el usuario', err);
        this.dialogRef.close(false);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
