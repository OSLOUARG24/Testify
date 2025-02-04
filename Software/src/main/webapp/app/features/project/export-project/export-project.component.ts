import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../project.model';

@Component({
  selector: 'app-export-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './export-project.component.html',
  styleUrl: './export-project.component.css'
})
export class ExportProjectComponent {

  projectForm!: FormGroup;
  projectId!: number;
  projectName!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

ngOnInit(): void {

  this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.projectId = +id;
          this.projectService.getProjectById(this.projectId).subscribe(
            (project: Project) => {
              this.projectName = project.name!; // Almacenar el nombre del proyecto
            },
            (error) => {
              console.error('Error al obtener el proyecto:', error);
            }
          );
        }
      });

  this.projectForm = this.fb.group({
    status: [],
    stage: []
    })
  }

  onSubmit(): void {

    this.projectService.exportPDF(this.projectId,
      this.projectForm.get('status')?.value ?? false,
        this.projectForm.get('stage')?.value ?? false
      ).subscribe(
          (response) => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            // Crear un enlace temporal para la descarga
            const link = document.createElement('a');
            link.href = url;

            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const formattedDateTime = `${year}${month}${day}_${hours}${minutes}${seconds}`;

            const sanitizedProjectName = this.projectName.replace(/[<>:"/\\|?*]+/g, ''); // Eliminar caracteres no válidos
            link.download = `${sanitizedProjectName}_${formattedDateTime}.pdf`;
            link.click();

            /*link.download = `project_report_${this.projectId}.pdf`;
            link.click();*/

            // Liberar el objeto URL después de la descarga
            window.URL.revokeObjectURL(url);
          },
          (error) => {
            console.error('Error downloading PDF', error);
          }
        );
  }

  cancel(): void {
        this.router.navigate(['/project']);
  }
}
