import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from '../role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../role.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-role',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-role.component.html',
  styleUrl: './update-role.component.css'
})
export class UpdateRoleComponent implements OnInit {
   updateRoleForm: FormGroup;
   isEditMode: boolean = false;
   roleId: number | null = null;
   errorMessage: string = '';
   successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateRoleForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verificamos si existe un roleId en la URL para saber si estamos en modo de edición
    this.roleId = +this.route.snapshot.paramMap.get('id')!;
    this.isEditMode = !!this.roleId;

    // Si estamos en modo de edición, cargamos los datos del rol
    if (this.isEditMode) {
      this.roleService.getRoleById(this.roleId).subscribe(
        (role: Role) => {
          this.updateRoleForm.patchValue({
            code: role.code,
            name: role.name
          });
        },
        (error) => {
          this.errorMessage = 'Error al cargar el rol';
        }
      );
    }
  }

  onSubmit() {
    if (this.updateRoleForm.valid) {
      const roleData: Role = {
        id: this.roleId ? this.roleId : undefined,
        code: this.updateRoleForm.value.code,
        name: this.updateRoleForm.value.name
      };

      if (this.isEditMode) {
        // Actualizar el rol existente
        this.roleService.updateRole(roleData).subscribe(
          () => {
            this.successMessage = 'Rol actualizado con éxito';
            this.router.navigate(['/role']);  // Redirigir a la lista de roles después de actualizar
          },
          (error) => {
            this.errorMessage = 'Error al actualizar el rol';
          }
        );
      } else {
        // Crear un nuevo rol
        this.roleService.createRole(roleData).subscribe(
          () => {
            this.successMessage = 'Rol creado con éxito';
            this.router.navigate(['/role']);  // Redirigir a la lista de roles después de crear
          },
          (error) => {
            this.errorMessage = 'Error al crear el rol';
          }
        );
      }
    }
  }

    cancel(): void {
      this.router.navigate(['/role']);
    }
}
