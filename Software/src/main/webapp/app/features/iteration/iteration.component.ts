import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { IterationService } from './iteration.service';
import { Iteration } from './iteration.model';
import { AuthGoogleService } from '../../auth-google/auth-google.service'; // Servicio para manejar la autenticación y roles
import { CommonModule } from '@angular/common';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project.model';
import { User } from '../user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteIterationComponent } from './delete-iteration/delete-iteration.component';
import { NavbarService } from '../../core/components/navbar/navbar.service'; // Importa el servicio
import { RoleAssigmentService } from '../../features/role-assigment/role-assigment.service';

@Component({
  selector: 'app-iteration',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.css']
})
export class IterationComponent implements OnInit {
  iterations: Iteration[] = [];
  project?: Project;
  projectId?: number;
  user?: User;
  permissions: string[] = []; // Lista de permisos del usuario

  constructor(
    private iterationService: IterationService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private authGoogleService: AuthGoogleService,
    private roleAssigmentService: RoleAssigmentService,
    public dialog: MatDialog,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {

        localStorage.removeItem('NameType');
        localStorage.removeItem('NameUser');
        localStorage.removeItem('NameRole');
        localStorage.removeItem('NameIteration');
        this.navbarService.notifyTypeChanged();
        this.navbarService.notifyUserChanged();
        this.navbarService.notifyRoleChanged();
        this.navbarService.notifyIterationChanged();

        this.loadIterations();
  }

  
  loadIterations(): void {
      // Obtener el ID del proyecto desde la URL y convertirlo a número
    const projectIdParam = this.route.snapshot.paramMap.get('id');
    this.projectId = projectIdParam ? +projectIdParam : undefined;  // Convertir a número
    if (this.projectId) {
      this.getIterationsByProjectId(this.projectId);  // Buscar las iteraciones con el ID del proyecto
      this.projectService.getProjectById(this.projectId).subscribe(
        (project: Project) => {
          sessionStorage.setItem('project', JSON.stringify(project));
        }
      );
      this.loadPermissions(this.projectId);
    } else {
      const project = sessionStorage.getItem('project');
      if (project) {
        this.project = JSON.parse(project);
        this.getIterationsByProjectId(this.project!.id);
        this.loadPermissions(this.project!.id);
      }
    }
    }

  // Obtener iteraciones filtradas por el ID del proyecto
  getIterationsByProjectId(projectId: number): void {
    this.iterationService.getIterationsByProjectId(projectId).subscribe(
      (iterations: Iteration[]) => {
        this.iterations = iterations;
      },
      (error) => {
        console.error('Error al obtener las iteraciones', error);  // Manejo de errores
      }
    );
  }

  Cancel(): void {
    window.history.back();
  }

	openDeleteModal(iteration: any): void {
	        const dialogRef = this.dialog.open(DeleteIterationComponent, {
	          width: '600px',
	          data: { iteration: iteration }
	        });

	        dialogRef.afterClosed().subscribe(result => {
	          if (result) {
	            this.loadIterations();
	          }
	        });
	      }

	      fetchIterations(): void {
        if (this.project){
          this.getIterationsByProjectId(this.project!.id);
        } else {
          this.iterationService.getIterations().subscribe(iterations => {
          	          this.iterations = iterations;
          	        });
          }
	      }

   goStage(iteration: Iteration): void {
     localStorage.setItem('NameIteration',iteration.name!);
     this.navbarService.notifyIterationChanged();
     this.router.navigate(['/stage',iteration.id]);
     }

     
loadPermissions(projectId: number) {
  
  const user = localStorage.getItem('user');
  if (user){
     this.user = JSON.parse(user);
  }

  if (!this.user || !projectId) {
    this.permissions = [];
    return;
  }

 this.roleAssigmentService.getPermissionsByUserIdAndProjectId(this.user.id!,projectId).subscribe((data) => {
  this.permissions = data;
});

  
}

hasPermission(permission: string): boolean {
  // Dividir el permiso en palabras
  const words = permission.split('_');

  // Si hay menos de 2 palabras, hacer la verificación normal
  if (words.length < 2) {
    return this.permissions.includes(permission);
  }

  // Obtener las dos primeras palabras del permiso
  const prefix = words.slice(0, 2).join('_'); // Ejemplo: "Consultar Iteraciones"

  // Buscar si algún permiso almacenado empieza con esas dos palabras
  return this.permissions.some(perm => perm.startsWith(prefix));
}
}
