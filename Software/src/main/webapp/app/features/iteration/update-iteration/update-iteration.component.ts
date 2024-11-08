import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,AbstractControl  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IterationService } from '../iteration.service';
import { Iteration } from '../iteration.model';
import { Project } from '../../project/project.model';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-update-iteration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-iteration.component.html',
  styleUrls: ['./update-iteration.component.css']
})
export class UpdateIterationComponent implements OnInit {

  iterationForm!: FormGroup;
  iterationId: number | null = null;
  isEditMode: boolean = false;
  projectFromSession: Project | null = null;  // Para almacenar el proyecto del sessionStorage
  projects: Project[] = [];  // Lista de proyectos en caso de que el proyecto no esté en sessionStorage
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private iterationService: IterationService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkSessionStorageForProject();
    this.initializeForm();

    // Revisar si hay un ID en la ruta para saber si es un update
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.iterationId = +id;
        this.isEditMode = true;
        this.loadIterationData(this.iterationId);
      }
    });
  }

  // Inicializar el formulario
  initializeForm(): void {
    this.iterationForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      project: [this.projectFromSession ? this.projectFromSession : '', [Validators.required]]
    }, { validators: this.endDateAfterStartDate('startDate', 'endDate') });
  }

  checkSessionStorageForProject(): void {
      const projectData = sessionStorage.getItem('project');
      if (projectData) {
        this.projectFromSession = JSON.parse(projectData) as Project;
        this.projects.push(this.projectFromSession);
      } else {
        // Si no hay un proyecto en sessionStorage, cargar los proyectos manualmente
        this.loadProjects();
      }
    }

  loadProjects(): void {
       this.projectService.getProjects().subscribe((projects: Project[]) => this.projects = projects);
    }

  // Cargar los datos de la iteración si estamos en modo de edición
  loadIterationData(id: number): void {
    this.iterationService.getIterationById(id).subscribe(
      (iteration: Iteration) => {
        this.iterationForm.patchValue({
          id: iteration.id,
          name: iteration.name,
          startDate: iteration.startDate,
          endDate: iteration.endDate,
          project: iteration.project
        });
      },
      (error) => {
        console.error('Error al cargar la iteración', error);
      }
    );
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.iterationForm.invalid) {
      return;
    }

    const iterationData: Iteration = this.iterationForm.value;

    // Asegurar que el objeto project es el correcto
    if (!iterationData.project) {
      console.error('No se ha seleccionado un proyecto.');
      return;
    }

    if (this.isEditMode) {
      this.updateIteration(this.iterationId!, iterationData);
    } else {
      this.createIteration(iterationData);
    }
  }

  // Crear una nueva iteración
  createIteration(iteration: Iteration): void {
    this.iterationService.createIteration(iteration).subscribe({
        next: (response) => {
          console.log('Iteración creada exitosamente');
          this.router.navigate(['/iteration']);
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
  }

  // Actualizar una iteración existente
  updateIteration(id: number, iteration: Iteration): void {
    this.iterationService.updateIteration(id, iteration).subscribe({
      next: (response) => {
        console.log('Iteración actualizada exitosamente');
        this.router.navigate(['/iteration']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  endDateAfterStartDate(startDateKey: string, endDateKey: string) {
      return (formGroup: AbstractControl): { [key: string]: any } | null => {
        const startDateControl = formGroup.get(startDateKey);
        const endDateControl = formGroup.get(endDateKey);

        if (!startDateControl || !endDateControl) {
          return null; // No se puede validar si uno de los controles no existe
        }

        const startDate = new Date(startDateControl.value);
        const endDate = new Date(endDateControl.value);

        if (endDate < startDate) {
          return { endDateBeforeStartDate: true }; // Retorna un error si la fecha de fin es anterior a la de inicio
        }

        return null; // Si la validación pasa, retorna null
      };
    }

  // Cancelar y regresar a la lista de iteraciones
  cancel(): void {
    this.router.navigate(['/iteration']);
  }
}
