import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl  } from '@angular/forms';
import { RolePermissionService } from '../role-permission.service';
import { PermissionService } from '../../permission/permission.service';
import { RoleService } from '../../role/role.service';
import { RolePermission } from '../role-permission.model';
import { Permission } from '../../permission/permission.model';
import { Role } from '../../role/role.model';
import { CommonModule } from '@angular/common';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-role-permission',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-role-permission.component.html',
  styleUrl: './update-role-permission.component.css'
})
export class UpdateRolePermissionComponent implements OnInit {

  rolePermissionForm!: FormGroup;
  rolePermissionId: number | null = null;  // Recibiremos el rolePermissionId
  isEditMode = false;
  permissions: Permission[] = [];
  roles: Role[] = [];

  constructor(
    private rolePermissionService: RolePermissionService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Recibimos el rolePermissionId de la URL
    this.rolePermissionId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.rolePermissionId;  // Si hay un ID, estamos en modo edición

    this.initForm();
    this.loadPermissionsAndRoles();

    if (this.isEditMode) {
      this.loadRolePermission();  // Cargamos la relación existente entre rol y permiso
    } else {
      const idRole = localStorage.getItem('IdRole');
          if (idRole) {
            // Cargar un tipo específico según el ID almacenado
            this.roleService.getRoleById(+idRole).subscribe(
              (role: Role) => {
                this.roles = [role]; // Solo se carga un tipo
                this.rolePermissionForm.patchValue({ role: role.id });
              },
              (error) => {
                console.error('Error al cargar el role por ID desde el LocalStorage', error);
              }
            );
          }
    }
  }

  // Inicializamos el formulario
  initForm(): void {
    this.rolePermissionForm = this.fb.group({
      id: [null],
      role: ['', Validators.required],
      permission: ['', Validators.required]
    });
  }

  loadPermissionsAndRoles(): void {
    // Cargar permisos
    this.permissionService.getPermissions().subscribe(
      (permissions: Permission[]) => {
        this.permissions = permissions;
      },
      error => {
        console.error('Error al cargar los permisos:', error);
      }
    );

    // Cargar roles
    this.roleService.getRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      error => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }

  // Cargar la asignación de rol-permiso usando el rolePermissionId
  loadRolePermission(): void {
    if (this.rolePermissionId) {
      this.rolePermissionService.getRolePermissionById(this.rolePermissionId).subscribe(
        (rolePermission: RolePermission) => {
          // Preseleccionamos el rol y permiso asignado en el formulario
          this.rolePermissionForm.patchValue({
            id: rolePermission.id,
            role: rolePermission.role?.id,  // Preseleccionar el rol
            permission: rolePermission.permission?.id  // Preseleccionar el permiso
          });
        },
        error => {
          console.error('Error al cargar la asignación de rol-permiso:', error);
        }
      );
    }
  }

  // Guardar los cambios
  saveRolePermission(): void {
    if (this.rolePermissionForm.invalid) {
      return;
    }
    // Obtenemos los IDs seleccionados de rol y permiso
    const selectedRoleId = Number(this.rolePermissionForm.get('role')?.value);
    const selectedPermissionId = Number(this.rolePermissionForm.get('permission')?.value);
    const selectedRole = this.roles.find(role => role.id === selectedRoleId);
    const selectedPermission = this.permissions.find(permission => permission.id === selectedPermissionId);

    const rolePermission: RolePermission = {
      ...this.rolePermissionForm.value,
      role: selectedRole!,  // Asignamos el objeto Role completo
      permission: selectedPermission!  // Asignamos el objeto Permission completo
    };

    if (this.isEditMode) {
      this.rolePermissionService.updateRolePermission(rolePermission).subscribe(
        () => {
          console.log('RolePermission actualizado exitosamente');
          this.router.navigate(['/rolePermission',selectedRole!.id!]);
        },
        error => {
          console.error('Error al actualizar el role assignment:', error);
        }
      );
    } else {
      this.rolePermissionService.createRolePermission(rolePermission).subscribe(
        () => {
          console.log('RolePermission creado exitosamente');
          this.router.navigate(['/rolePermission',selectedRole!.id!]);
        },
        error => {
          console.error('Error al crear el role assignment:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/role']);
  }
}
