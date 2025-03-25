import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.css'
})
export class DeleteCategoryComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: any },
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

    onConfirm(): void {
      this.categoryService.deleteCategory(this.data.category.id).subscribe({
        next: () => {
          this.snackBar.open(`Categoría ${this.data.category.name} eliminada`, 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open(`Error al eliminar la categoría: Verifique que la categoría no este en uso y reintente nuevamente`, 'Cerrar', {
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

