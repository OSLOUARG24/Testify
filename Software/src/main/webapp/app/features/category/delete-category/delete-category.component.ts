import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../category.service';

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
    private categoryService: CategoryService
  ) {}

  onConfirm(): void {
    this.categoryService.deleteCategory(this.data.category.id).subscribe({
      next: () => {
        console.log(`Categoría ${this.data.category.name} eliminada`);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al eliminar la categoría', err);
        this.dialogRef.close(false);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

