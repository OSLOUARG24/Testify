
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})

export class UpdateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  projectId: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Check if we are in edit mode by looking at the route parameter
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.projectId = +id;
        this.isEditMode = true;
        this.loadProjectData(this.projectId);
      }
    });
  }

  // Initialize the project form
  initializeForm(): void {
    this.projectForm = this.fb.group({
      id:  ['', [Validators.required]],
      name: ['', [Validators.required]],
      status: [true, Validators.required],
      rateApproval:['', [Validators.required]]
    });
  }

  // Load existing project data if editing
  loadProjectData(id: number): void {
    this.projectService.getProjectById(id).subscribe(
      (project: Project) => {
        this.projectForm.patchValue({
          id: project.id,
          name: project.name,
          status: project.status,
          rateApproval: project.rateApproval
        });
      },
      (error) => {
        console.error('Error loading project', error);
      }
    );
  }

  // Submit form data to create or update the project
  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    const projectData: Project = this.projectForm.value;

    if (this.isEditMode) {
      this.updateProject(this.projectId!, projectData);
    } else {
      this.createProject(projectData);
    }
  }

  // Create a new project
  createProject(project: Project): void {
    this.projectService.createProject(project).subscribe(
      () => {
        console.log('Project created successfully!');
        this.router.navigate(['/projects']);
      },
      (error) => {
        console.error('Error creating project', error);
      }
    );
  }

  // Update an existing project
  updateProject(id: number, project: Project): void {
    this.projectService.updateProject(id, project).subscribe(
      () => {
        console.log('Project updated successfully!');
        this.router.navigate(['/project']);
      },
      (error) => {
        console.error('Error updating project', error);
      }
    );
  }

    // Cancelar y volver a la lista de usuarios
    cancel(): void {
      this.router.navigate(['/project']);
    }
}
