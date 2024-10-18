import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubTypeService } from '../sub-type.service';

@Component({
  selector: 'app-delete-sub-type',
  standalone: true,
  imports: [],
  templateUrl: './delete-sub-type.component.html',
  styleUrl: './delete-sub-type.component.css'
})
export class DeleteSubTypeComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteSubTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { subType: any },
    private subTypeService: SubTypeService
  ) {}

  onConfirm(): void {
    this.subTypeService.deleteSubType(this.data.subType.id).subscribe({
      next: () => {
        console.log(`Subtipo de escenario ${this.data.subType.name} eliminado`);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al eliminar el subtipo de escenario', err);
        this.dialogRef.close(false);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
