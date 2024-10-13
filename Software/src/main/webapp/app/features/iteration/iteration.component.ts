import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { IterationService } from './iteration.service';
import { Iteration } from './iteration.model';
import { AuthGoogleService } from '../../auth-google/auth-google.service'; // Servicio para manejar la autenticación y roles
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar el pipe date
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project.model';

@Component({
  selector: 'app-iteration',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './iteration.component.html',
  styleUrls: ['./iteration.component.css']
})
export class IterationComponent implements OnInit {

  iterations: Iteration[] = [];  // Array de iteraciones filtradas por el proyecto
  isAdmin: boolean = false;  // Para controlar la visibilidad de los botones
  project?: Project;
  projectId?: number;  // Cambiado a number | undefined

  constructor(
    private iterationService: IterationService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private authGoogleService: AuthGoogleService  // Servicio para verificar los roles del usuario
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario tiene el rol ADMIN
    this.isAdmin = true;

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

  // Método para eliminar la iteración
  deleteIteration(iterationId: number): void {
    if (confirm('¿Estás seguro de eliminar esta iteración?')) {
      this.iterationService.deleteIteration(iterationId).subscribe(
        () => {
          alert('Iteración eliminada');
          // Filtrar la iteración eliminada del array
          this.iterations = this.iterations.filter(i => i.id !== iterationId);
        },
        (error) => {
          console.error('Error al eliminar la iteración', error);
        }
      );
    }
  }

  Cancel(): void {
    window.history.back();
  }
}
