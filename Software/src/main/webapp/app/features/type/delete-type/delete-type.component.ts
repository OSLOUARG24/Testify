import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-delete-type',
  standalone: true,
  imports: [],
  templateUrl: './delete-type.component.html',
  styleUrl: './delete-type.component.css'
})
export class DeleteTypeComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: any },
    private typeService: TypeService
  ) {}

  onConfirm(): void {
    this.typeService.deleteType(this.data.type.id).subscribe({
      next: () => {
        console.log(`Tipo de escenario ${this.data.type.name} eliminado`);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al eliminar el tipo de escenario', err);
        this.dialogRef.close(false);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
