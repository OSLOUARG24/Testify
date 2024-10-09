import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoleAssigmentService } from '../role-assigment.service';
import { ProjectService } from '../../project/project.service';
import { RoleService } from '../../role/role.service';
import { UserService } from '../../user/user.service';
import { RoleAssigment } from '../role-assigment.model';
import { User } from '../../user/user.model';
import { Project } from '../../project/project.model';
import { Role } from '../../role/role.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-role-assigment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-role-assigment.component.html',
  styleUrls: ['./update-role-assigment.component.css']
})
export class UpdateRoleAssigmentComponent implements OnInit {
  roleAssigmentForm!: FormGroup;
  roleAssigmentId: number | null = null;
  isEditMode = false;
  userId: number | null = null;
  user!: User;
  projects: Project[] = [];
  roles: Role[] = [];

  constructor(
    private roleAssigmentService: RoleAssigmentService,
    private projectService: ProjectService,
    private roleService: RoleService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.roleAssigmentId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.roleAssigmentId;
    this.userId = Number(sessionStorage.getItem('roleAssigUserId'));
    this.initForm();
    this.loadProjectsAndRoles();
    this.loadUser();
    if (this.isEditMode) {
      this.loadRoleAssigment();
    }
    else {
      const project = sessionStorage.getItem('project');
      if (project){
      const projectSelected = JSON.parse(project);
      if (projectSelected){
        this.roleAssigmentForm.patchValue({
                project: projectSelected.id  // Asignamos el id del proyecto al formulario
              });
        }
      }
    }
  }

  // Inicializamos el formulario
  initForm(): void {
    this.roleAssigmentForm = this.fb.group({
      id: [null],
      user: [null],
      role: ['', Validators.required],
      project: ['', Validators.required]
    });
  }

  loadProjectsAndRoles(): void {
    this.projectService.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      error => {
        console.error('Error al cargar los proyectos:', error);
      }
    );

    this.roleService.getRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      error => {
        console.error('Error al cargar los roles:', error);
      }
    );
  }

  loadRoleAssigment(): void {
    if (this.roleAssigmentId) {
      this.roleAssigmentService.getRoleAssigmentById(this.roleAssigmentId).subscribe(
        (roleAssigment: RoleAssigment) => {
          this.roleAssigmentForm.patchValue({
            id: roleAssigment.id,
            user: roleAssigment.user,
            role: roleAssigment.role?.id,  // Usamos el id del rol
            project: roleAssigment.project?.id  // Usamos el id del proyecto
          });
        },
        error => {
          console.error('Error al cargar el role assignment:', error);
        }
      );
    }
  }

  saveRoleAssigment(): void {
    if (this.roleAssigmentForm.invalid) {
      return;
    }

    // Obtenemos los objetos completos de Role y Project basados en los ids seleccionados
      const selectedRoleId = Number(this.roleAssigmentForm.get('role')?.value);
      const selectedProjectId = Number(this.roleAssigmentForm.get('project')?.value);
    const selectedRole = this.roles.find(role => role.id === selectedRoleId);
    const selectedProject = this.projects.find(project => project.id === selectedProjectId);

    const roleAssigment: RoleAssigment = {
      ...this.roleAssigmentForm.value,
      user: this.user,
      role: selectedRole!,  // Asignamos el objeto Role completo
      project: selectedProject!  // Asignamos el objeto Project completo
    };

    if (this.isEditMode) {
      this.roleAssigmentService.updateRoleAssigment(roleAssigment).subscribe(
        () => {
          console.log('RoleAssigment actualizado exitosamente');
          this.router.navigate(['/roleAssigment', this.userId]);
        },
        error => {
          console.error('Error al actualizar el role assignment:', error);
        }
      );
    } else {
      this.roleAssigmentService.createRoleAssigment(roleAssigment).subscribe(
        () => {
          console.log('RoleAssigment creado exitosamente');
          this.router.navigate(['/roleAssigment', this.userId]);
        },
        error => {
          console.error('Error al crear el role assignment:', error);
        }
      );
    }
  }

  loadUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (data: User) => {
          this.user = data;
        },
        error => {
          console.error('Error al cargar el usuario:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/roleAssigment', this.userId]);
  }
}
