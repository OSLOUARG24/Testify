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

  constructor(
    private iterationService: IterationService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private authGoogleService: AuthGoogleService,
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
    } else {
      const project = sessionStorage.getItem('project');
      if (project) {
        this.project = JSON.parse(project);
        this.getIterationsByProjectId(this.project!.id);
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
	            this.fetchIterations();
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

     isAdmin() {
           const user = localStorage.getItem('user');
             if (user){
                this.user = JSON.parse(user);
             }
           return this.user?.admin;
         }


   goStage(iteration: Iteration): void {
     localStorage.setItem('NameIteration',iteration.name!);
     this.navbarService.notifyIterationChanged();
     this.router.navigate(['/stage',iteration.id]);
     }
}
