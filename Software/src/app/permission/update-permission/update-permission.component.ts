import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PermissionService } from '../permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from '../permission.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-permission',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-permission.component.html',
  styleUrl: './update-permission.component.css'
})
export class UpdatePermissionComponent implements OnInit {
   updatePermissionForm: FormGroup;
   isEditMode: boolean = false;
   permissionId: number | null = null;
   errorMessage: string = '';
   successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updatePermissionForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verificamos si existe un permissionId en la URL para saber si estamos en modo de edición
    this.permissionId = +this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.permissionId;

    // Si estamos en modo de edición, cargamos los datos del rol
    if (this.isEditMode) {
      this.permissionService.getPermissionById(this.permissionId).subscribe(
        (permission: Permission) => {
          this.updatePermissionForm.patchValue({
            name: permission.name
          });
        },
        (error) => {
          this.errorMessage = 'Error al cargar el rol';
        }
      );
    }
  }

  onSubmit() {
    if (this.updatePermissionForm.valid) {
      const permissionData: Permission = {
        id: this.permissionId ? this.permissionId : undefined,
        name: this.updatePermissionForm.value.name
      };

      if (this.isEditMode) {
        // Actualizar el rol existente
        this.permissionService.updatePermission(permissionData).subscribe(
          () => {
            this.successMessage = 'Rol actualizado con éxito';
            this.router.navigate(['/permission']);  // Redirigir a la lista de permissions después de actualizar
          },
          (error) => {
            this.errorMessage = 'Error al actualizar el rol';
          }
        );
      } else {
        // Crear un nuevo rol
        this.permissionService.createPermission(permissionData).subscribe(
          () => {
            this.successMessage = 'Permiso creado con éxito';
            this.router.navigate(['/permission']);  // Redirigir a la lista de permissions después de crear
          },
          (error) => {
            this.errorMessage = 'Error al crear el permiso';
          }
        );
      }
    }
  }

      cancel(): void {
        this.router.navigate(['/permission']);
      }
}
